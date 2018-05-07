function getServerInfo() {
	var serverInfo = {
		serverIp:"http://121.250.213.90:8080",
//		serverIp:"http://192.168.99.245:8080",
		registerInterface:"/user/register",
		loginInterface:"/user/login",
		getContactGroup: "/user/getContactGroup/",
		getContactList: "/user/getContactList"
	};
	
	return serverInfo;
}
