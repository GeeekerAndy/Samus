/**
 * H5+初始化
 */
if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

function plusReady() {

}

function addImg() {

	var btnArray = [{
		title: "拍照"
	}, {
		title: "从相册选择"
	}];
	plus.nativeUI.actionSheet({
		title: "选择照片",
		cancel: "取消",
		buttons: btnArray
	}, function(e) {
		var index = e.index;
		switch(index) {
			case 0:
				break;
			case 1:
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(path) {
					//					console.log("照片路径：" + path);
					document.getElementById("publish-img").src = "file://" + plus.io.convertLocalFileSystemURL(path);
				}, function(err) {});
				break;
			case 2:
				plus.gallery.pick(function(path) {
					document.getElementById("publish-img").src = "file://" + plus.io.convertLocalFileSystemURL(path);
				}, function(err) {}, null);
				break;
		}
		//		document.getElementById("publish-add-btn").style.visibility = 'hidden';
	});
}

function publish() {
	//例子
	//	{
	//		"content": "今天很开心",
	//		"picture": ["data:imag"]
	//	}
	var avatarBase64;
	toDataUrl($("#publish-img").attr("src"), function(myBase64) {
		avatarBase64 = myBase64;
		var sendData = {
			"content": $("#publish-text").val(),
			"picture": [
				avatarBase64
			]
		}
		console.log("publish() 将要更新的信息为：" + JSON.stringify(sendData));
		$.ajax({
			url: getServerInfo().serverIp + getServerInfo().publish,
			data: JSON.stringify(sendData),
			type: 'post',
			contentType: 'application/json',
			cache: false,
			dataType: 'json',
			success: function(data) {
				if(data["code"] == "0") {
					mui.toast("发布成功");
					mui.back();
				} else {
					mui.toast("发布失败");
					console.log("发布动态失败：" + JSON.stringify(data));
				}

			},
			error: function(XMLHttpRequest, status, error) {
				mui.toast("无法连接服务器");
				console.log(XMLHttpRequest);
				console.log(status);
				console.log(error);
			}
		});
		//	console.log("头像：" + userInfo.avatar + "昵称" + userInfo.nickname + "性别：" + userInfo.gender);

	});

}

function toDataUrl(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		var reader = new FileReader();
		reader.onloadend = function() {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}