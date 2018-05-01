/**
 * H5+初始化
 */
if (window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

function plusReady() {
	plus.key.addEventListener('backbutton', function () {
		plus.runtime.quit();
	}, false);
}

$(document).ready(function () {

	var animating = false;
	// var cardsCounter = 0;
	// var numOfCards = 6;
	var decisionVal = 150;
	var pullDeltaX = 0;
	var deg = 0;
	var $card, $cardReject, $cardLike;
	//card的容器（父元素）
	var cardCont = document.body.querySelector('.demo__card-cont');

	//初始化预加载3个匹配用户；
	var i;
	for (i = 0; i < 3; i++) {
		addOneMatch();
	}

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

		if (pullDeltaX >= decisionVal) {
			$card.addClass("to-right");
		} else if (pullDeltaX <= -decisionVal) {
			$card.addClass("to-left");
		}

		//滑动超过阈值，删除用户
		if (Math.abs(pullDeltaX) >= decisionVal) {
			$card.addClass("inactive");
			setTimeout(function () {
				//每删除一个用户，就添加一个用户
				cardCont.removeChild(document.body.querySelector(".inactive"));
				addOneMatch();
			}, 300);
		}

		//未超过阈值，重置
		if (Math.abs(pullDeltaX) < decisionVal) {
			$card.addClass("reset");
		}

		setTimeout(function () {
			$card.attr("style", "").removeClass("reset")
				.find(".demo__card__choice").attr("style", "");

			pullDeltaX = 0;
			animating = false;
		}, 300);
	};

	function addOneMatch() {
		var newCard = document.createElement("div");
		var basicInfo = "小星星 白羊座 22";
		var signature = "哈哈哈哈哈";
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

	$(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function (e) {
		if (animating) return;

		$card = $(this);
		$cardReject = $(".demo__card__choice.m--reject", $card);
		$cardLike = $(".demo__card__choice.m--like", $card);
		var startX = e.pageX || e.originalEvent.touches[0].pageX;

		$(document).on("mousemove touchmove", function (e) {
			var x = e.pageX || e.originalEvent.touches[0].pageX;
			pullDeltaX = (x - startX);
			if (!pullDeltaX) return;
			pullChange();
		});

		$(document).on("mouseup touchend", function () {
			$(document).off("mousemove touchmove mouseup touchend");
			if (!pullDeltaX) return; // prevents from rapid click events
			release();
		});
	});

});