// pages/member/login.js
Page({
  data: {
    srcPhoneIcon: '/images/phone_icon.png',
    srcPasswordIcon: '/images/password_icon.png',
    winHeight:0,
    winWidth:0
  },
  //跳转个人中心
  goMember:function(){
    wx.navigateTo({
      url: '../member/member'
    })
  },
  //跳转注册页面
  goRegister:function(){
    wx.navigateTo({
      url: '../member/register'
    })
  },
  //跳转忘记密码页面
  goForget:function(){
    wx.navigateTo({
      url: '../member/forget'
    })
  },
  onLoad: function (options) {
    // 标题
    wx.setNavigationBarTitle({
      title: '会员登录'
    });
    //获取屏幕的高度
    var that = this;
    wx.getSystemInfo( {
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
       }
     });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})



