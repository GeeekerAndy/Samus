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
//	plus.webview.open("_www/main/main.html");
	mui.openWindow("../main/main.html");
}