// function enterMainPage() {

// 	mui.init({
// 		swipeBack: true //启用右滑关闭功能
// 	});
// 	mui.plusReady(function () {
// 		//判断是否登录
		
// 		// 创建子webview窗口 并初始化
// 		var aniShow = {};
// 		util.initSubpage(aniShow);

// 		var nview = plus.nativeObj.View.getViewById('tabBar'),
// 			subpages = util.options.subpages,
// 			activePage,
// 			targetPage = plus.webview.getWebviewById(subpages[0]),
// 			pageW = window.innerWidth,
// 			currIndex = 0;
// 		// 初始化聊天界面
// 		util.changeSubpage(targetPage, activePage, aniShow);
// 		//更新当前活跃的页面
// 		activePage = targetPage;


// 		/**
// 		 * 根据判断view控件点击位置判断切换的tab
// 		 */
// 		nview.addEventListener('click', function (e) {
// 			var clientX = e.clientX;
// 			if (clientX > 0 && clientX <= parseInt(pageW * 0.2)) {
// 				currIndex = 0;
// 			} else if (clientX > parseInt(pageW * 0.2) && clientX <= parseInt(pageW * 0.4)) {
// 				currIndex = 1;
// 			} else if (clientX > parseInt(pageW * 0.4) && clientX <= parseInt(pageW * 0.6)) {
// 				currIndex = 2;
// 			} else if (clientX > parseInt(pageW * 0.6) && clientX <= parseInt(pageW * 0.8)) {
// 				currIndex = 3;
// 			} else {
// 				currIndex = 4;
// 			}

// 			// 匹配对应tab窗口	
// 			targetPage = plus.webview.getWebviewById(subpages[currIndex]);

// 			if (targetPage == activePage) {
// 				return;
// 			}
// 			//底部选项卡切换
// 			util.toggleNview(currIndex);
// 			// 子页面切换
// 			util.changeSubpage(targetPage, activePage, aniShow);
// 			//更新当前活跃的页面
// 			activePage = targetPage;
// 		});
// 	});
// }
// var util = {
// 	options: {
// 		ACTIVE_COLOR: "#007aff",
// 		NORMAL_COLOR: "#000",
// 		HEART_COLOR: "#ff9999",
// 		subpages: ["chat/chat.html", "contacts/contacts.html", "match/match.html", "me/me.html", "timeline/timeline.html"]
// 	},
// 	/**
// 	 *  简单封装了绘制原生view控件的方法
// 	 *  绘制内容支持font（文本，字体图标）,图片img , 矩形区域rect
// 	 */
// 	drawNative: function (id, styles, tags) {
// 		var view = new plus.nativeObj.View(id, styles, tags);
// 		return view;
// 	},
// 	/**
// 	 * 初始化首个tab窗口 和 创建子webview窗口 
// 	 */
// 	initSubpage: function (aniShow) {
// 		var subpage_style = {
// 			top: 0,
// 			bottom: 51
// 		},
// 			subpages = util.options.subpages,
// 			self = plus.webview.currentWebview(),
// 			temp = {};

// 		//兼容安卓上添加titleNView 和 设置沉浸式模式会遮盖子webview内容
// 		if (mui.os.android) {
// 			if (plus.navigator.isImmersedStatusbar()) {
// 				subpage_style.top += plus.navigator.getStatusbarHeight();
// 			}
// 			if (self.getTitleNView()) {
// 				subpage_style.top += 40;
// 			}

// 		}

// 		// 初始化第一个tab项为首次显示
// 		temp[self.id] = "true";
// 		mui.extend(aniShow, temp);
// 		// 初始化绘制首个tab按钮
// 		util.toggleNview(0);

// 		for (var i = 0, len = subpages.length; i < len; i++) {

// 			if (!plus.webview.getWebviewById(subpages[i])) {
// 				var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
// 				console.log("后台创建界面:" + i);
// 				//初始化隐藏
// 				sub.hide();
// 				// append到当前父webview
// 				self.append(sub);
// 			}
// 		}
// 	},
// 	/**	
// 	 * 点击切换tab窗口 
// 	 */
// 	changeSubpage: function (targetPage, activePage, aniShow) {
// 		//若为iOS平台或非首次显示，则直接显示
// 		if (mui.os.ios || aniShow[targetPage]) {
// 			plus.webview.show(targetPage);
// 		} else {
// 			//否则，使用fade-in动画，且保存变量
// 			var temp = {};
// 			temp[targetPage] = "true";
// 			mui.extend(aniShow, temp);
// 			plus.webview.show(targetPage, "fade-in", 300);
// 		}
// 		//隐藏当前 除了第一个父窗口
// 		if (activePage !== plus.webview.getLaunchWebview()) {
// 			plus.webview.hide(activePage);
// 		}
// 	},
// 	/**
// 	 * 点击重绘底部tab （view控件）
// 	 */
// 	toggleNview: function (currIndex) {
// 		currIndex = currIndex * 2;
// 		// 重绘当前tag 包括icon和text，所以执行两个重绘操作
// 		if (currIndex == 4) {
// 			util.updateSubNView(currIndex, util.options.HEART_COLOR);
// 			util.updateSubNView(currIndex + 1, util.options.HEART_COLOR);
// 		} else {
// 			util.updateSubNView(currIndex, util.options.ACTIVE_COLOR);
// 			util.updateSubNView(currIndex + 1, util.options.ACTIVE_COLOR);
// 		}
// 		// 重绘兄弟tag 反之排除当前点击的icon和text
// 		for (var i = 0; i < 10; i++) {
// 			if (i !== currIndex && i !== currIndex + 1) {
// 				util.updateSubNView(i, util.options.NORMAL_COLOR);
// 			}
// 		}
// 	},
// 	/*
// 	 * 改变颜色
// 	 */
// 	changeColor: function (obj, color) {
// 		obj.color = color;
// 		return obj;
// 	},
// 	/*
// 	 * 利用 plus.nativeObj.View 提供的 drawText 方法更新 view 控件
// 	 */
// 	updateSubNView: function (currIndex, color) {
// 		var self = plus.webview.currentWebview(),
// 			nviewEvent = plus.nativeObj.View.getViewById("tabBar"), // 获取nview控件对象
// 			nviewObj = self.getStyle().subNViews[0], // 获取nview对象的属性
// 			currTag = nviewObj.tags[currIndex]; // 获取当前需重绘的tag

// 		nviewEvent.drawText(currTag.text, currTag.position, util.changeColor(currTag.textStyles, color), currTag.id);
// 	}
// };

/**
 * "launchwebview": {
            "bottom": "0px",
            "background": "#fff",
            "subNViews": [
                {
                    "id": "tabBar",
                    "styles": {
                        "bottom": "0px",
                        "left": "0",
                        "height": "50px",
                        "width": "100%",
                        "backgroundColor": "#fff"
                    },
                    "tags": [
                        {
                            "tag": "font",
                            "id": "chat",
                            "text": "\ue66a",
                            "position": {
                                "top": "4px",
                                "left": "0",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "fontSrc": "_www/fonts/iconfont.ttf",
                                "align": "center",
                                "size": "24px"
                            }
                        },
                        {
                            "tag": "font",
                            "id": "chatText",
                            "text": "聊天",
                            "position": {
                                "top": "23px",
                                "left": "0",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "align": "center",
                                "size": "10px"
                            }
                        },

                        {
                            "tag": "font",
                            "id": "contacts",
                            "text": "\ue7da",
                            "position": {
                                "top": "4px",
                                "left": "20%",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "fontSrc": "_www/fonts/iconfont.ttf",
                                "align": "center",
                                "size": "24px"
                            }
                        },
                        {
                            "tag": "font",
                            "id": "contactsText",
                            "text": "通讯录",
                            "position": {
                                "top": "23px",
                                "left": "20%",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "align": "center",
                                "size": "10px"
                            }
                        },
                        {
                            "tag": "font",
                            "id": "match",
                            "text": "\ue667",
                            "position": {
                                "top": "4px",
                                "left": "40%",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "fontSrc": "_www/fonts/iconfont.ttf",
                                "align": "center",
                                "size": "24px"
                            }
                        },
                        {
                            "tag": "font",
                            "id": "matchText",
                            "text": "匹配",
                            "position": {
                                "top": "23px",
                                "left": "40%",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "align": "center",
                                "size": "10px"
                            }
                        },
                        {
                            "tag": "font",
                            "id": "me",
                            "text": "\ue631",
                            "position": {
                                "top": "4px",
                                "left": "60%",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "fontSrc": "_www/fonts/iconfont.ttf",
                                "align": "center",
                                "size": "24px"
                            }
                        },
                        {
                            "tag": "font",
                            "id": "meText",
                            "text": "个人主页",
                            "position": {
                                "top": "24px",
                                "left": "60%",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "align": "center",
                                "size": "10px"
                            }
                        },
                        {
                            "tag": "font",
                            "id": "timeline",
                            "text": "\ue62d",
                            "position": {
                                "top": "4px",
                                "left": "80%",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "fontSrc": "_www/fonts/iconfont.ttf",
                                "align": "center",
                                "size": "24px"
                            }
                        },
                        {
                            "tag": "font",
                            "id": "timelineText",
                            "text": "动态",
                            "position": {
                                "top": "24px",
                                "left": "80%",
                                "width": "20%",
                                "height": "24px"
                            },
                            "textStyles": {
                                "align": "center",
                                "size": "10px"
                            }
                        },
                        {
                            "tag": "rect",
                            "id": "tabBorder",
                            "position": {
                                "top": "0",
                                "left": "0",
                                "width": "100%",
                                "height": "1px"
                            },
                            "rectStyles": {
                                "color": "#ccc"
                            }
                        }
                    ]
                }
            ]
        },
 */