mui.init({
	subpages: [ //先加载首页  
		{
			url: 'chat/chat.html',
			id: 'tab_chat',
			styles: {
				top: '45px',
				bottom: '50px',
				backButtonAutoControl: 'quit'
			}
		}

	],
	preloadPages: [ //缓存其他页面  
		{
			url: 'contacts/contacts.html',
			id: 'tab_contacts',
			styles: {
				top: '45px',
				bottom: '50px',
				backButtonAutoControl: 'quit'
			}
		},
		{
			url: 'match/match.html',
			id: 'tab_match',
			styles: {
				top: '45px',
				bottom: '50px',
				backButtonAutoControl: 'quit'
			}
		},
		{
			url: 'me/me.html',
			id: 'tab_me',
			styles: {
				top: '45px',
				bottom: '50px',
				backButtonAutoControl: 'quit'
			}
		},
		{
			url: 'timeline/timeline.html',
			id: 'tab_timeline',
			styles: {
				top: '45px',
				bottom: '50px',
				backButtonAutoControl: 'quit'
			}
		}

	]
});

mui.plusReady(function() {
	var tab_chat, tab_contacts, tab_match, tab_me, tab_timeline;
	//点击触发切换动作
	mui("#nav").on("tap", "#tab_chat", function() {  
		tab_chat = plus.webview.getWebviewById("tab_chat");
		plus.webview.show(tab_chat);
		plus.webview.hide(tab_contacts);
		plus.webview.hide(tab_match);
		plus.webview.hide(tab_me);
		plus.webview.hide(tab_timeline);
	})
	mui("#nav").on("tap", "#tab_contacts", function() { 
		tab_contacts = plus.webview.getWebviewById("tab_contacts");
		plus.webview.hide(tab_chat);
		plus.webview.hide(tab_match);
		plus.webview.hide(tab_me);
		plus.webview.hide(tab_timeline);
		plus.webview.show(tab_contacts);
		
	})
	mui("#nav").on("tap", "#tab_match", function() { 
		tab_match = plus.webview.getWebviewById("tab_match");
		plus.webview.hide(tab_chat);
		plus.webview.hide(tab_contacts);
		plus.webview.hide(tab_me);
		plus.webview.hide(tab_timeline);
		plus.webview.show(tab_match);
	})
	mui("#nav").on("tap", "#tab_me", function() { 
		tab_me = plus.webview.getWebviewById("tab_me");
		plus.webview.hide(tab_chat);
		plus.webview.hide(tab_match);
		plus.webview.hide(tab_contacts);
		plus.webview.hide(tab_timeline);
		plus.webview.show(tab_me);
	})
	mui("#nav").on("tap", "#tab_timeline", function() { 
		tab_timeline = plus.webview.getWebviewById("tab_timeline");
		plus.webview.hide(tab_chat);
		plus.webview.hide(tab_match);
		plus.webview.hide(tab_me);
		plus.webview.hide(tab_contacts);
		plus.webview.show(tab_timeline);
	})
});