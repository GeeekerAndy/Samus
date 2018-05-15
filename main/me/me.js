/**
 * MUI初始化
 */
mui.init({
	swipeBack: false,
	pullRefresh: {
		container: '#me-pullrefresh',
		down: {
			style: 'circle',
			callback: pulldownRefresh
		},
	}
	//考虑本地存储部分联系人，用于离线显示
});

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
	updatePage();
}

/**
 * 下拉刷新联系人
 */
function pulldownRefresh() {
	setTimeout(function() {
		updatePersonalInfo();
	}, 1000);
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
				updatePage();
				mui.toast('更新成功');
				//本地保存个人信息
				plus.storage.setItem("nickname", userInfo.data.nickname);
				plus.storage.setItem("schoolid5", userInfo.data.schoolId5);
				if(userInfo.data.age != null) {
					plus.storage.setItem("age", userInfo.data.age.toString());
					console.log("me.js updatePersonInfo() userInfo.data.age: " + plus.storage.getItem("age"));
				}
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
				//				console.log("获取头像，存入本地：" + userInfo.data.avatar);
			} else {
				mui.toast("更新失败");
			}
			mui('#me-pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			mui.toast("无法连接到服务器");
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function updatePage() {
	var avatar = plus.storage.getItem("avatar");
	//	console.log("updatePage():" + avatar);
	var nickname = plus.storage.getItem("nickname");
	var intro = plus.storage.getItem("intro");
	$("#me-avatar").attr('src', 'data:image/png;base64,' + avatar);
	$("#me-user-name").text(nickname);
	$("#me-intro").text(intro);
}

function editInfo() {
	plus.webview.open('changeInfo.html', 'new', {}, 'slide-in-right', 200);
}

function editMusic() {
	plus.webview.open('music.html', 'new', {}, 'slide-in-right', 200);
}

function editTravel() {
	plus.webview.open('travel.html', 'new', {}, 'slide-in-right', 200);
}

function editMovie() {
	plus.webview.open('movie.html', 'new', {}, 'slide-in-right', 200);
}

function editCartoon() {
	plus.webview.open('cartoon.html', 'new', {}, 'slide-in-right', 200);
}

function editReading() {
	plus.webview.open('reading.html', 'new', {}, 'slide-in-right', 200);
}

function editArt() {
	plus.webview.open('art.html', 'new', {}, 'slide-in-right', 200);
}

function editSport() {
	plus.webview.open('sport.html', 'new', {}, 'slide-in-right', 200);
}

function editIdol() {
	plus.webview.open('idol.html', 'new', {}, 'slide-in-right', 200);
}

function editFood() {
	plus.webview.open('food.html', 'new', {}, 'slide-in-right', 200);
}

function editGame() {
	plus.webview.open('game.html', 'new', {}, 'slide-in-right', 200);
}

function quitApplication() {
	plus.storage.removeItem("userAccount");
	plus.storage.removeItem("userPassword");
	plus.runtime.restart();
}