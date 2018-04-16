/*
 * 处理登录界面跳转提交逻辑
 */
function jumpToChooseHoobies() {
	plus.webview.open('/modules/choosehoobies/chooseHoobies.html', 'new', {}, 'slide-in-right', 200);

	//	document.addEventListener('plusready', function() {
	//		//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
	//	});
}