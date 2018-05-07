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
/*
 * 跳转到主页面
 */
function jumpToMainPage() {

	var loginSchool = $("#login-school option:selected");
	var loginAccount = $("#login-account");
	var loginPwd = $("#login-password");
	var serverInfo = getServerInfo();
	var targetUrl = serverInfo.serverIp + serverInfo.loginInterface;
	var sendData = {
		"userId": loginSchool.val() + loginAccount.val(),
		"password": loginPwd.val()
	};
	//	obj = JSON.parse(sendData);
	// console.log("targetUrl: " + targetUrl);
	// console.log("sendData: " + sendData + " JSON.stringify(): " + JSON.stringify(sendData));
	$.ajax({
		url: targetUrl, // 跳转到 action    
		data: JSON.stringify(sendData),
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

		success: function(data) {
			console.log(JSON.stringify(data));
			if(data["code"] == "0") {
				mui.toast("登录成功");
				plus.storage.setItem("userAccount", sendData.userId);
				plus.storage.setItem("userPassword", sendData.password);
				mui.openWindow("../main/main.html");
			} else if(data["code"] == "1007") {
				mui.toast("账号为空");
			} else if(data["code"] == "1008") {
				mui.toast("密码为空");
			} else if(data["code"] == "1009") {
				mui.toast("账号密码为空");
			} else if(data["code"] == "1010") {
				mui.toast("账号密码错误");
			} else if(data["code"] == "1011") {
				mui.toast("账号未注册");
			} else {
				mui.toast("登录失败");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			mui.toast("无法连接到服务器");
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
	//	$.post(targetUrl, sendData, function(data, status) {
	//		alert("Data: " + data + "\nStatus: " + status);
	//	});
}
/*
 * 跳转到用户注册
 */
function jumpToRegister() {
	plus.webview.open('register.html', 'new', {}, 'slide-in-right', 200);
}
/*
 * 跳转到密码找回
 */
function jumpToForgetPwd() {
	plus.webview.open('forgetpwd.html', 'new', {}, 'slide-in-right', 200);
}