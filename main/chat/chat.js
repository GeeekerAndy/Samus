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
	//本地消息保存策略
});

/**
 * H5+初始化
 */
if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready',plusReady,false);
}
function plusReady() {
	plus.key.addEventListener('backbutton', function() {
		plus.runtime.quit();
	}, false);
}
/**
 * 下拉刷新，添加未读消息
 */
function pulldownRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		var avatar = '"avatar.gif"';
		var userName = "云天明";
		var isRead = "未读";
		var userIntro = "这是我的昵称"
		var oneChatElement = '\
	    <div class="mui-slider-cell">\
	        <div class="oa-contact-cell mui-table">\
	            <div class="oa-contact-avatar mui-table-cell">\
	                <img src=' + avatar + ' />\
	            </div>\
	            <div class="oa-contact-content mui-table-cell">\
	                <div class="mui-clearfix">\
	                    <h4 class="oa-contact-name">' + userName + '</h4>\
	                    <span class="oa-contact-position mui-h6">' + isRead + '</span>\
	                </div>\
	                <p class="oa-contact-email mui-h6">' + userIntro + '</p>\
	            </div>\
	        </div>\
	    </div >';
		for(var i = cells.length, len = i + 3; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = oneChatElement;
			//下拉刷新，未读插到最前面；
			table.insertBefore(li, table.firstChild);
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		mui.toast('刷新成功');
	}, 1000);
}