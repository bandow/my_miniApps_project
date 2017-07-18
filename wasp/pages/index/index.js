/**
 *  zhoujianheng @ Shanghai Hanyun Info Tech Corp.
 */
//index.js

var util = require('../../utils/util.js')
var hycomm = require('../../utils/hycomm.js')

var app = getApp()
Page({
  data: {
  },
  bindInputBlur: function(e) {
    app.data.keyword = e.detail.value;
  },
  bindInput: function(e) {
    app.data.keyword = e.detail.value;
  },
  //事件处理函数
  bindSrchBtnTap: function() {
    wx.navigateTo({
      url: '../srchresult/srchresult'
    })
  },
  bindLinkerTap: function(e){
    var ptype = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../packlist/packlist?type='+ptype
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var _this = this;
    wx.showShareMenu();
  },
})
