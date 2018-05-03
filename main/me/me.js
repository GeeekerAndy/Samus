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
function editInfo() {
	plus.webview.open('info.html', 'new', {}, 'slide-in-right', 200);
}

function editMusic() {
	plus.webview.open('music.html', 'new', {}, 'slide-in-right', 200);
}

function editTravel() {

}

function editMovie() {

}

function editCartoon() {

}

function editReading() {

}

function editArt() {

}

function editSport() {

}

function editIdol() {

}

function editFood() {

}

function editGame() {

}