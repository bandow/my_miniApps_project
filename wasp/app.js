/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
var wechat = require('./utils/wechat.js');

App({
  data: {
    hasLogin: false,
    userInfo: null,
    keyword: "",
  },
  /**
   * WeChat API
   */
  wechat: wechat,
  /**
   * 获取用户基本信息 API.
   * @param {Object} cb
   */
  getUserInfo:function(cb){
    var that = this
    if(this.data.userInfo){
      typeof cb == "function" && cb(this.data.userInfo)
    }else{
      //调用登录接口
      wechat.getUserInfo().then(function(res){
    		console.log('拉取用户基本资料成功', res)
        that.data.userInfo = res.userInfo
        typeof cb == "function" && cb(that.data.userInfo)
    	}).catch(function(err){
    		console.log('拉取用户基本资料异常',err)
    		typeof cb == "function" && cb(err)
    	})
    }
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
})
