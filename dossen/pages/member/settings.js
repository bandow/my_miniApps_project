// pages/member/settings.js
var memberService = require('../../utils/service/memberService.js');
var util = require('../../utils/util.js');
var User = null;
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '设置'
    })
  },
  checkOut :function(){
    //util.showTip('退出中');
    //memberService.checkOut();
    wx.redirectTo({
      url: '../member/login?Method=Login',
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})