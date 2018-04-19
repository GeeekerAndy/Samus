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
});

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
    setTimeout(function () {
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
        for (var i = cells.length, len = i + 3; i < len; i++) {
            var li = document.createElement('li');
            li.className = 'mui-table-view-cell';
            li.innerHTML = oneChatElement;
            //下拉刷新，新纪录插到最前面；
            table.insertBefore(li, table.firstChild);
        }
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
        mui.toast('刷新成功');
    }, 1000);
}