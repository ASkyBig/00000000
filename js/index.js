const CONFIG = {

}

LBF.define("ecy_activity/2018/00000000/js/index.js", require => {

	const platformType = untils.getPlatformType(); // 平台信息
	const AJAX_HOST = platformType === 'local' ? 'https://yapi.yuewen.com/mock/212' : ''; // 请求前缀
	const { isInApp, platform, business } = pageData; // pageData 为页面直出的数据

	const COMMON_URL = {
		QIDIAN_GTIMG: `https://${platformType}qidian.gtimg.com`,// 静态资源域名
		ACG_CONFIG: `https://${platformType}activity.yqacg.com`,// 活动页面域名
	}

	const URL = {
		API: {
			SHARE: `${AJAX_HOST}/ajax/act2018/xxxxx/share`, // 分享
		},
		HOST: `${platformType === 'local' ? 'http://localactivity.yqacg.com:8008' : COMMON_URL.ACG_CONFIG}/2018/00000000`,
		SHARE_IMG_COVER: `https://qidian.qpic.cn/qidian_common/349573/51e40fcc09024dec146970270a43ff4f/0`// 分享的封面图（如果分享图片不存在，会导致安卓分享出错）
	}

	const view = {
		init: function() {
			this.initSettings();
		},
		// 页面初始设置
		initSettings: function () {
			// 页面埋点
			this.reportFunc({p1: 1});
		},
		// 添加监听事件，用以用户登陆、分享、送礼物、充值之后刷新页面
		bindBrowserVisibilityChange: function (){
			window.jssdk.addEventListener("browserVisibilityChange", function(data) {
				if(data && data.result === 0 && data.data.visibility) {
					location.reload()
				}
			});
		},
		// 可用性检查
		usabilityCheck: function (){
			// 是否在App内
			if(isInApp) {
				// 判断是否登录
				if(pageData.isLogin){
					return true;
				}else{
					window.jssdk.app.open('/login');
					return false;
				}
			}else{
				window.jssdk.app.open(`${URL.HOST}`);
				return false;
			}
		},
    	// 获取cookie数据
		getCookie: function (name){
			var carr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			if (carr != null){
				return unescape(carr[2]);
			}
			return null;
		},
    	// 埋点
		reportFunc: function(options) {
			if(platformType === 'local') return
			if(_qdReport && typeof _qdReport !== 'undefined' && options){
				_qdReport(pageData)(options)
			}
		}
	}
	view.init()
})