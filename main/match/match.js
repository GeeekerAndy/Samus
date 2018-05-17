/**
 * H5+初始化
 */
if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

function plusReady() {
	plus.key.addEventListener('backbutton', function() {
		plus.runtime.quit();
	}, false);
}

$(document).ready(function() {
	//添加更新推荐列表策略
	var animating = false;
	// var cardsCounter = 0;
	// var numOfCards = 6;
	var decisionVal = 150;
	var pullDeltaX = 0;
	var deg = 0;
	var $card, $cardReject, $cardLike;
	//card的容器（父元素）
	var cardCont = document.body.querySelector('.demo__card-cont');
	$.when(getRecommendList()).then(addFirstPage());

	function pullChange() {
		animating = true;
		deg = pullDeltaX / 10;
		$card.css("transform", "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)");

		var opacity = pullDeltaX / 100;
		var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
		var likeOpacity = (opacity <= 0) ? 0 : opacity;
		$cardReject.css("opacity", rejectOpacity);
		$cardLike.css("opacity", likeOpacity);
	};

	/**
	 * 每划掉一个用户，自动从后台预先下载3个用户
	 */
	function release() {
		var isLeft = false;
		if(pullDeltaX >= decisionVal) {
			$card.addClass("to-right");
			isLeft = false; //左不喜欢
		} else if(pullDeltaX <= -decisionVal) {
			$card.addClass("to-left");
			isLeft = true; //右喜欢
		}

		//滑动超过阈值，删除用户
		if(Math.abs(pullDeltaX) >= decisionVal) {
			$card.addClass("inactive");
			setTimeout(function() {
				//每删除一个用户，就添加一个用户
				cardCont.removeChild(document.body.querySelector(".inactive"));
				addOneMatch();
				//添加左右滑动是否喜欢
				var targetUrl;
				if(isLeft == true) {
					targetUrl = getServerInfo().serverIp + getServerInfo().dislike;
				} else {
					targetUrl = getServerInfo().serverIp + getServerInfo().like;
				}
				var currentId = $("#current-id").text();
				var sendData = {
					"contactId": currentId
				};
				console.log("左滑|右滑id:" + JSON.stringify(sendData));
				$.ajax({
					url: targetUrl,
					data: JSON.stringify(sendData),
					type: 'post',
					contentType: 'application/json',
					cache: false,
					dataType: 'json',
					success: function(data) {
//						console.log("左滑|右滑结果：" + targetUrl + JSON.stringify(data));
					},
					error: function(XMLHttpRequest, status, error) {
						mui.toast("无法连接服务器");
						console.log(XMLHttpRequest);
						console.log(status);
						console.log(error);
					}
				});

			}, 300);
		}

		//未超过阈值，重置
		if(Math.abs(pullDeltaX) < decisionVal) {
			$card.addClass("reset");
		}

		setTimeout(function() {
			$card.attr("style", "").removeClass("reset")
				.find(".demo__card__choice").attr("style", "");

			pullDeltaX = 0;
			animating = false;
		}, 300);
	};

	//添加第一页提示页
	function addFirstPage() {
		var newCard = document.createElement("div");
		var basicInfo = "滴，上车！";
		var signature = "← 左滑嫌弃 | 右滑欢喜 → ";
		var avatar = '"../../images/avatar.jpg"';
		newCard.className = 'card card-custom demo__card';
		newCard.innerHTML = '\
					  <img class="card-img-top" src=' + avatar + ' alt="Card img cap">\
					  <div class="card-body">\
						<h1>' + basicInfo + '</h1>\
						<h2 class="card-text" style="margin-top: 20px;">' + signature + '</h2>\
					  </div>\
					  <div class="demo__card__choice m--reject"></div>\
					  <div class="demo__card__choice m--like"></div>\
					  <div class="demo__card__drag"></div>';
		// cardCont.appendChild(newCard);
		cardCont.insertBefore(newCard, cardCont.firstChild);

	}

	function addOneMatch() {
		var newCard = document.createElement("div");
		var basicInfo = "小星星 白羊座 22";
		var signature = "哈哈哈哈哈";
		var avatar = '"../../images/avatar.jpg"';
		getOneRecommendId();
		var id = plus.storage.getItem("tempId");
//		console.log("将要查询的id为：" + id);
		var sendData = {
			"contactId": id
		};
		$.ajax({
			url: getServerInfo().serverIp + getServerInfo().getRecommendDetail, // 跳转到 action    
			data: JSON.stringify(sendData),
			type: 'post',
			contentType: "application/json",
			cache: false,
			dataType: 'json',
			success: function(userInfo) {
//				console.log("获取推荐联系人具体信息结果：" + JSON.stringify(userInfo));
				if(userInfo["code"] == "0") {
					//					console.log("成功获取推荐联系人信息: " + JSON.stringify(userInfo));

					newCard.className = 'card card-custom demo__card';
					newCard.innerHTML = '\
					  <img class="card-img-top" src="data:image/png;base64,' + userInfo.data.avatar + '" alt="Card img cap">\
					  <div class="card-body">\
						<h1>' + userInfo.data.nickname + " " + userInfo.data.age + '</h1>\
						<h2 class="card-text" style="margin-top: 20px;">' + userInfo.data.intro + '</h2>\
						<p id="current-id" style="visibility: hidden;">' + userInfo.data.userid + '</p>\
					  </div>\
					  <div class="demo__card__choice m--reject"></div>\
					  <div class="demo__card__choice m--like"></div>\
					  <div class="demo__card__drag"></div>';
					// cardCont.appendChild(newCard);
					cardCont.insertBefore(newCard, cardCont.firstChild);

				} else {
					//					mui.toast("更新失败");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				mui.toast("无法连接到服务器");
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});

	}

	$(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
		if(animating) return;

		$card = $(this);
		$cardReject = $(".demo__card__choice.m--reject", $card);
		$cardLike = $(".demo__card__choice.m--like", $card);
		var startX = e.pageX || e.originalEvent.touches[0].pageX;

		$(document).on("mousemove touchmove", function(e) {
			var x = e.pageX || e.originalEvent.touches[0].pageX;
			pullDeltaX = (x - startX);
			if(!pullDeltaX) return;
			pullChange();
		});

		$(document).on("mouseup touchend", function() {
			$(document).off("mousemove touchmove mouseup touchend");
			if(!pullDeltaX) return; // prevents from rapid click events
			release();
		});
	});

	function getRecommendList() {
		$.ajax({
			url: getServerInfo().serverIp + getServerInfo().getRecommendList, // 跳转到 action    
			data: JSON.stringify(""),
			type: 'post',
			contentType: "application/json",
			cache: false,
			dataType: 'json',
			success: function(userInfo) {
//				console.log("获取推荐列表结果:" + JSON.stringify(userInfo));
				if(userInfo["code"] == "0") {
					//					console.log("成功获取推荐列表: " + JSON.stringify(userInfo));
					//本地保存个人信息
					//列表示例
					//				{
					//					"code": 0,
					//					"msg": "success",
					//					"data": [
					//						"00335201228133654",
					//						"00519201598046755",
					//						"00519201618350398",
					//						"00519201823384941",
					//						"00583201869933929",
					//						"10002201599177541",
					//						"10004201390321697"
					//					]
					//				}

					mui.plusReady(function() {
						plus.storage.setItem("recommendList", JSON.stringify(userInfo));
						//						console.log("推荐联系人data数组长度:" + userInfo.data.length.toString());
						plus.storage.setItem("recommendListLength", userInfo.data.length.toString());
						//					mui.toast("获取本地联系人list:" + plus.storage.getItem("recommendList"));
						addOneMatch();
						//						console.log("获取本地存储列表长度:" + plus.storage.getItem("recommendListLength"));
						//						console.log("获取本地存储的列表" + plus.storage.getItem("recommendList"));
					});

				} else {
					mui.toast("更新失败");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				mui.toast("无法连接到服务器");
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}

	//添加更新匹配人的逻辑 Undone.
	function getOneRecommendId() {
		mui.plusReady(function() {
			var index = plus.storage.getItem("index");
			if(plus.storage.getItem("index") == null) {
				//更新
				getRecommendList();
				plus.storage.setItem("index", "0");
				index = 0;
				console.log("index为空, 添加为0");
			} else {
				index = parseInt(plus.storage.getItem("index"));
				var listLength = parseInt(plus.storage.getItem("recommendListLength"));
//				console.log("本地列表长度:" + plus.storage.getItem("recommendListLength"));
				if(index < listLength) {
					//			plus.storage.setItem("index" + index.toString());
//					console.log("index不为空,小于列表长度");
				} else {
					//更新
					getRecommendList();
					plus.storage.setItem("index", "0");
					index = 0;
					console.log("index到达尾部");
				}
			}
			var nextIndex = index + 1;
//			console.log("下一个nextIndex为:" + nextIndex);
			plus.storage.setItem("index", nextIndex.toString());
//			console.log("存入的下一个index为:" + plus.storage.getItem("index"));
//			console.log("本次获取index" + index);
			//			console.log("本次存储的列表为:" + plus.storage.getItem("recommendList"));
			//			var test = {
			//				"code": 0,
			//				"msg": "success",
			//				"data": ["104220", "104221", "104222", "104223", "104224", "104225", "104226"]
			//			};
			var userId = JSON.parse(plus.storage.getItem("recommendList"));
			//			console.log("测试:test.data[0] = " + userId.data[0]);
			//			console.log("将要返回的数据为:" + userId.data[index]);
			plus.storage.setItem("tempId", userId.data[index]);
			//			console.log("获取本地tempId" + plus.storage.getItem("tempId"));
			//			return userId.data[index];
		});

	}

});