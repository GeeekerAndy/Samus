//获取显示个人信息的元素
var changeInfoAccount = $("#change-info-account");
var changeInfoPassword = $("#change-info-password");
var changeInfoNickname = $("#change-info-nickname");
var changeInfoAvatar = $("#change-info-avatar");
var changeInfoAge = $("#change-info-age");
var changeInfoGender = $("#change-info-gender option:selected");
var changeInfoIntro = $("#change-info-intro");
var changeInfoTel = $("#change-info-tel");

/**
 * H5+初始化
 */
if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

function plusReady() {
	//填写原信息，提升用户体验
	var avatar = plus.storage.getItem("avatar");
	var userAccount = plus.storage.getItem("userAccount");
	var userPassword = plus.storage.getItem("userPassword");
	var nickname = plus.storage.getItem("nickname");
	var userAge = plus.storage.getItem("age");
	console.log("changeInfo plusReady() userAge: " + userAge);
	var gender = plus.storage.getItem("gender");
	var intro = plus.storage.getItem("intro");
	var phone = plus.storage.getItem("phone");
	changeInfoAvatar.attr("src", "data:image/jpeg;base64," + avatar);
	changeInfoAccount.val(userAccount);
	changeInfoPassword.val(userPassword);
	changeInfoNickname.val(nickname);
	changeInfoAge.val(userAge);
	if(gender == "0") {
		changeInfoGender.text("女生");
	} else {
		changeInfoGender.text("男生");
	}
	changeInfoIntro.val(intro);
	changeInfoTel.val(phone);
}

function changeAvatar() {

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
					console.log("照片路径：" + path);
					document.getElementById("change-info-avatar").src = "file://" + plus.io.convertLocalFileSystemURL(path);
					//                  send({
					//                      sender: 'self',
					//                      type: 'image',
					//                      content: "file://" + plus.io.convertLocalFileSystemURL(path)
					//                  });
				}, function(err) {});
				break;
			case 2:
				plus.gallery.pick(function(path) {
					document.getElementById("change-info-avatar").src = "file://" + plus.io.convertLocalFileSystemURL(path);

					//                  send({
					//                      sender: 'self',
					//                      type: 'image',
					//                      content: path
					//                  });
				}, function(err) {}, null);
				break;
		}
	});
}

function confirm() {
	var avatarBase64;
	toDataUrl(changeInfoAvatar.attr("src"), function(myBase64) {
		avatarBase64 = myBase64;
		console.log("获取的mybase64" + myBase64); // myBase64 is the base64 string

		var userInfo = {
			"password": changeInfoPassword.val(),
			"nickname": changeInfoNickname.val(),
			"age": changeInfoAge.val(),
			"gender": changeInfoGender.val(),
			"intro": changeInfoIntro.val(),
			"phone": changeInfoTel.val(),
			"avatar": avatarBase64
		}
		if (userInfo.age == "" || userInfo.phone == "") {
			mui.toast("年龄或号码格式错误");
			return;
		}
		console.log("confirm() 将要更新的信息为：" + JSON.stringify(userInfo));
		$.ajax({
			url: getServerInfo().serverIp + getServerInfo().updateUserInfo,
			data: JSON.stringify(userInfo),
			type: 'post',
			contentType: 'application/json',
			cache: false,
			dataType: 'json',
			success: function(data) {
				if(data["code"] == "0") {
					mui.toast("更新成功");
					plus.storage.setItem("userPassword", userInfo.password);
					updatePersonalInfo();
					mui.back();
				} else {
					mui.toast("更新失败");
					console.log("更新信息失败：" + JSON.stringify(data));
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

function updatePersonalInfo() {
	//4.CSS中使用：background-image: url("data:image/png;base64,iVBORw0KGgo=...");
	//5.HTML中使用：< img src="data:image/png;base64,iVBORw0KGgo=..." />
	//等服务器
	$.ajax({
		url: getServerInfo().serverIp + getServerInfo().getUserInfo, // 跳转到 action    
		data: JSON.stringify(""),
		//			data: {
		//				"userId": "201400301193",
		//				"password": "123456"
		//			},
		//			data: '{"userId":"201400301193","password":"123456"}',
		//		data: JSON.stringify({"userId":"201400301193","password":"123456"}),
		type: 'post',
		contentType: "application/json",
		cache: false,
		dataType: 'json',
		success: function(userInfo) {
			console.log(JSON.stringify(userInfo));
			if(userInfo["code"] == "0") {
				mui.toast('更新本地信息成功');
				//本地保存个人信息
				plus.storage.setItem("nickname", userInfo.data.nickname);
				plus.storage.setItem("schoolid5", userInfo.data.schoolId5);
				plus.storage.setItem("age", userInfo.data.age.toString());
				console.log("changeInfo.js updatePersonalInfo userInfo.data.age:" + userInfo.data.age);
				plus.storage.setItem("gender", userInfo.data.gender);
				plus.storage.setItem("intro", userInfo.data.intro);
				plus.storage.setItem("phone", userInfo.data.phone);
				plus.storage.setItem("art", userInfo.data.art);
				plus.storage.setItem("cartoon", userInfo.data.cartoon);
				plus.storage.setItem("food", userInfo.data.food);
				plus.storage.setItem("idol", userInfo.data.idol);
				plus.storage.setItem("game", userInfo.data.game);
				plus.storage.setItem("movie", userInfo.data.movie);
				plus.storage.setItem("music", userInfo.data.music);
				plus.storage.setItem("reading", userInfo.data.reading);
				plus.storage.setItem("sport", userInfo.data.sport);
				plus.storage.setItem("travel", userInfo.data.travel);
				plus.storage.setItem("avatar", userInfo.data.avatar);
				console.log("获取信息，存入本地：" + userInfo.data.avatar);
			} else {
				mui.toast("更新本地信息失败，请刷新重试");
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