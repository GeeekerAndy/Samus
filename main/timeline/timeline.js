/**
 * H5+初始化
 */
if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

/**
 * MUI初始化
 */
mui.init({
	swipeBack: false,
	pullRefresh: {
		container: '#me-pullrefresh',
		down: {
			style: 'circle',
			callback: pulldownRefresh
		},
	}
	//考虑本地存储部分联系人，用于离线显示
});

function plusReady() {
	plus.key.addEventListener('backbutton', function() {
		plus.runtime.quit();
	}, false);
}

function pulldownRefresh() {
	setTimeout(function() {
		updatePublish();
	}, 1000);
}

function updatePublish() {
	var sendData = {
		"pageSize": "10",
		"pageNumber": 1
	}

	$.ajax({
		url: getServerInfo().serverIp + getServerInfo().getRecords, // 跳转到 action    
		data: JSON.stringify(sendData),
		type: 'post',
		contentType: "application/json",
		cache: false,
		dataType: 'json',
		success: function(userInfo) {
			console.log(JSON.stringify(userInfo));
			if(userInfo["code"] == "0") {
				addToUI(userInfo);
				mui.toast('更新成功');
			} else {
				mui.toast("更新失败");
			}
			mui('#me-pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			mui.toast("无法连接到服务器");
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function makePublish() {
	plus.webview.open('publish.html', 'new', {}, 'slide-in-right', 200);
}

function addToUI(records) {
	for (var i = 0; i < records.data.length; i++) {
		var avatar = plus.storage.getItem("avatar");
		var nickname = plus.storage.getItem("nickname");
		var createTime = records.data[i].createtime;
		var content = records.data[i].content;
		var picture = records.data[i].picture;
		console.log("动态图片为：" + picture);
		var oneElement = '\
			<div class="mui-card-header" style="padding: 5px 0 0 5px">\
				<img class="mui-pull-left" src="data:image/png;base64,' + avatar + '" style="width: 40px; height: 40px; border-radius: 50%" />\
			    <div class="mui-media-body" style="padding-left: 60px">' + nickname + '\
			    	<p>' + createTime + '</p>\
			    </div>\
			</div>\
			<div class="mui-card-content" style="padding: 2px 5px 2px 5px">\
				<h5>' + content +'</h5>\
			</div>\
			<div class="mui-card-body">\
					<img src="' + picture + '" style="max-width: 100%; height: auto;" />\
			</div>';
		console.log("添加的一个动态:" + oneElement);
		var newNode = document.createElement('div');
		newNode.className = 'card';
		newNode.style = 'margin: 2px 0px;';
		newNode.innerHTML = oneElement;
		document.getElementById("me-pullrefresh").appendChild(newNode);
	}
}
