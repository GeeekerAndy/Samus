/*
 * 处理登录界面跳转提交逻辑
 */
function jumpToRegister() {
    plus.webview.open('/modules/register/register.html', 'new', {}, 'slide-in-right', 200);

}

// H5 plus事件处理
// function plusReady() {
//     plus.key.addEventListener('backbutton', function () {
//         nw && nw.isVisible() ? nw.hide('pop-out') : plus.runtime.quit();
//     }, false);
// }

// if (window.plus) {
//     plusReady();
// } else {
//     document.addEventListener('plusready', plusReady, false);
// }
// var nw = null;
// // 创建带原生子View控件的Webview窗口 
// function createWebview() {
//     nw = nw || plus.webview.create('/modules/register/register.html', 'test', {
//         popGesture: 'hide', subNViews: [{
//             id: 'subnview1',
//             styles: { top: '0px', height: '100px', backgroundColor: '#FF0000' },
//             tags: [{ tag: 'font', id: 'font', text: '原生子View控件', textStyles: { size: '18px' } }]
//         }]
//     });
//     nw.addEventListener('close', function () {
//         nw = null;
//     }, false);
    
//     nw.show('pop-in');
// }