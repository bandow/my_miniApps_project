//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    srcSearch: '/images/search_icon.png',
    srcMember: '/images/member_icon.png',
    imgArray: [
      { mode: 'aspectFit', srcCityList: '/images/sh.png' },
      { mode: 'aspectFit', srcCityList: '/images/sz.png' },
      { mode: 'aspectFit', srcCityList: '/images/gz.png' }
    ],
    srcTitleL: '/images/titleL.png',
    srcTitleR: '/images/titleR.png',
    imgUrls: [
      '/images/theme01.png',
      '/images/theme01.png',
      '/images/theme01.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  //跳转个人中心
  bindMemberTap: function () {
    wx.navigateTo({
      url: '../member/member'
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../photograph/list'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
