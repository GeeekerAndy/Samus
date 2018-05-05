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
/*
 * 处理登录界面跳转提交逻辑
 */
function jumpToMainPage() {
	var registerSchool = $("#register-school option:selected");
	var registerGender = $("#regidter-gender option:selected");
	var registerAccount = $("#register-account");
	var registerPwd = $("#register-password");
	var serverInfo = getServerInfo();
	var targetUrl = "http://" + serverInfo.serverIp + serverInfo.registerInterface;
	var sendData = {
		"schoolName": registerSchool.text(),
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
		success: function (data) {
			if(data["code"] = 0) {
				mui.toast("注册成功");
			}
			console.log(JSON.stringify(data));
			
			mui.openWindow("../main/main.html");
		},
		error: function (XMLHttpRequest,status, error) {
			console.log(XMLHttpRequest);
			console.log(status);
			console.log(error);
		}
	});
}