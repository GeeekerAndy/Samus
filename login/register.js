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
 * 处理登录界面跳转提交逻辑
 */
function jumpToMainPage() {
	var registerSchool = $("#register-school option:selected");
	var registerGender = $("#regidter-gender option:selected");
	var registerAccount = $("#register-account");
	var registerPwd = $("#register-password");
	var serverInfo = getServerInfo();
	var targetUrl = serverInfo.serverIp + serverInfo.registerInterface;
	var sendData = {
		"schoolId5": registerSchool.val(),
		"xuehao": registerAccount.val(),
		"gender": registerGender.text(),
		"password": registerPwd.val()
	};
	$.ajax({
		url: targetUrl,
		data: JSON.stringify(sendData),
		type: 'post',
		contentType: 'application/json',
		cache: false,
		dataType: 'json',
		success: function(data) {
			if(data["code"] == "0") {
				mui.toast("注册成功");
				plus.storage.setItem("userAccount", sendData.schoolId5 + sendData.xuehao);
				plus.storage.setItem("userPassword", sendData.password);
				mui.openWindow("../main/main.html");
			} else {
				if(false) {

				} else if(data["code"] == "1012") {
					mui.toast("学校为空");
				} else if(data["code"] == "1013") {
					mui.toast("学号为空");
				} else if(data["code"] == "1014") {
					mui.toast("学号密码为空");
				} else if(data["code"] == "1008") {
					mui.toast("密码为空");
				} else if(data["code"] == "1017") {
					mui.toast("账号已注册");
				} else {
					mui.toast("注册失败");
				}
			}
			console.log(JSON.stringify(data));

		},
		error: function(XMLHttpRequest, status, error) {
			mui.toast("无法连接服务器");
			console.log(XMLHttpRequest);
			console.log(status);
			console.log(error);
		}
	});
}