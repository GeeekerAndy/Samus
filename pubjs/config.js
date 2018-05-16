function getServerInfo() {
	//测试账号：人大 10002+201599177541
	//123
	var serverInfo = {
		serverIp: "http://121.250.213.90:8080", //寝室
		//		serverIp:"http://192.168.99.245:8080",
		//		serverIp: "http://211.87.233.121:8080", //图书馆
		registerInterface: "/user/register", //注册
		loginInterface: "/user/login", //登录
		getContactGroup: "/user/getContactGroup/", //获取联系人分组
		getContactList: "/user/getContactList", //获取联系人列表
		getUserInfo: "/user/getUserInfo", //获取个人信息
		getRecords:"/record/getRecords", //获取动态
		getRecommendList: "/relation/getRecommendList", //获取推荐联系人列表
		updateHobby: "/user/updateHobby", //更新爱好
		updateUserInfo: "/user/updateUserInfo", //更新个人信息
		publish: "/record/publish"//发布动态
		

	};

	return serverInfo;
}