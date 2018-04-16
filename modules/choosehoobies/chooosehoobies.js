/*
 * 处理登录界面跳转提交逻辑
 */
function jumpToHome() {
    plus.webview.open('/modules/home/home.html', 'new', {}, 'slide-in-right', 200);
}