/**
 * MUI初始化
 */
mui.init({
	swipeBack: false,
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			callback: pulldownRefresh
		},
	}
	//考虑本地存储部分联系人，用于离线显示
});

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

/**
 * 下拉刷新联系人
 */
function pulldownRefresh() {
	setTimeout(function() {
		// var table = document.body.querySelector('.mui-table-view');
		// var cells = document.body.querySelectorAll('.mui-table-view-cell');
		// var avatar = '"../../images/avatar.jpg"';
		// var userName = "云天明";
		// var group = "同学";
		// var userIntro = "这是我的昵称"
		// var oneChatElement = '\
		// <div class="mui-slider-cell">\
		// 	<div class="oa-contact-cell mui-table">\
		// 		<div class="oa-contact-avatar mui-table-cell">\
		// 			<img style="width: 40px; height: 40px;" src=' + avatar + ' />\
		// 		</div>\
		// 		<div class="oa-contact-content mui-table-cell">\
		// 			<div class="mui-clearfix">\
		// 				<h5 class="oa-contact-name">' + userName + '</h5>\
		// 				<span class="oa-contact-position mui-h6">' + group + '</span>\
		// 			</div>\
		// 		</div>\
		// 	</div>\
		// </div >';
		// for (var i = cells.length, len = i + 3; i < len; i++) {
		// 	var li = document.createElement('li');
		// 	li.className = 'mui-table-view-cell';
		// 	li.innerHTML = oneChatElement;
		// 	//下拉刷新，新联系人添加到最后
		// 	//			table.insertBefore(li, table.firstChild);
		// 	table.appendChild(li);

		// }
		$.ajax({
			url: getServerInfo().serverIp + getServerInfo().getContactGroup,
			data: "",
			type: 'post',
			contentType: 'application/json',
			cache: false,
			dataType: 'json',
			success: function(result) {
				if(result["code"] == "0") {
					addContactGroup(result);
					updateContactList();
				}
			},
			error: function(XMLHttpRequest, status, error) {
				mui.toast("无法连接服务器");
				console.log(XMLHttpRequest);
				console.log(status);
				console.log(error);
			}
		});
		//		var groupJson = {
		//			"code": 0,
		//			"msg": "success",
		//			"data": [
		//				"山大",
		//				"北大",
		//				"清华"
		//			]
		//		};
		//				var contactJson = {
		//					"code": 0,
		//					"msg": "success",
		//					"data": [{
		//						"name": "夏雪1",
		//						"group": "山大"
		//					}, {
		//						"name": "夏雪2",
		//						"group": "山大"
		//					}, {
		//						"name": "夏雪3",
		//						"group": "清华"
		//					}, {
		//						"name": "夏雪4",
		//						"group": "北大"
		//					}]
		//				};

		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		mui.toast('刷新成功');
	}, 1000);
}

function updateContactList() {
	$.ajax({
		url: getServerInfo().serverIp + getServerInfo().getContactList,
		data: "",
		type: 'post',
		contentType: 'application/json',
		cache: false,
		dataType: 'json',
		success: function(result) {
			console.log("联系人列表：" + JSON.stringify(result));
			if(result["code"] == "0") {
				addContactToAGroup(result);
			}
		},
		error: function(XMLHttpRequest, status, error) {
			mui.toast("无法连接服务器");
			console.log(XMLHttpRequest);
			console.log(status);
			console.log(error);
		}
	});
}

function addContactGroup(groupJson) {

	var contactGroupContainer = document.body.querySelector('.contact-group');

	for(var i = 0; i < groupJson.data.length; i++) {
		if(document.body.querySelector('#' + groupJson.data[i]) == null) {
			var li = document.createElement('li');
			li.id = groupJson.data[i];
			li.className = 'mui-table-view-cell mui-collapse';
			li.innerHTML = '<a class="mui-navigate-right" href="#">' + groupJson.data[i] + '</a>';
			contactGroupContainer.appendChild(li);
		}
	}
}

function addContactToAGroup(contactJson) {
	for(var i = 0; i < contactJson.data.length; i++) {
		var contactGroup = document.body.querySelector('#' + contactJson.data[i].group);
		var contactElement = '\
			<div class="mui-slider-cell">\
				<div class="oa-contact-cell mui-table">\
					<div class="oa-contact-avatar mui-table-cell">\
						<img style="width: 40px; height: 40px;" src="../../images/avatar.jpg" />\
					</div>\
					<div class="oa-contact-content mui-table-cell">\
						<div class="mui-clearfix">\
							<h5 class="oa-contact-name">' + contactJson.data[i]['name'] + '</h5>\
						</div>\
					</div>\
				</div>\
			</div>';
		var newNode = document.createElement('ul');
		newNode.className = 'mui-table-view mui-table-view-chevron';
		newNode.innerHTML = contactElement;

		var contactId = contactJson.data[i]['contactId'];
		var contactName = contactJson.data[i]['name'];
		//传不进去参数
		newNode.addEventListener('tap', function(contactId, contactName) {
			console.log("联系人Id:" + contactId);
			plus.webview.open('chat.html?chatId=' + contactId + '&chatName=' + encodeURI(contactName), 'new', {}, 'slide-in-right', 200);
		});
		contactGroup.appendChild(newNode);

	}

}