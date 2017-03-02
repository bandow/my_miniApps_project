// pages/member/PointDetail.js
var baseRQ = require('../../utils/models/BaseRQ.js');
var memberService = require('../../utils/service/memberService.js');
var commonService = require('../../utils/service/commonService.js');
var util = require('../../utils/util.js');
var User = null;
var _onloaded = false;
Page({
  data: {
    PointList: [],
    member: [],
    onloaded :false,
  },
  onLoad: function (options) { 
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的积分',
    })
    User = memberService.getCurrentUser();
    if (util.isNullOrEmpty(User)) {
      //跳转至登录
      wx.redirectTo({
        url: '../member/login'
      });
    } else {
      //积分查询(分页)
      util.showLoading();
      var request = baseRQ.getInstance().create();
      request.MemberNo = User.MemberNo;
      memberService.MemberPointQuery(request, function (res) {
        util.hideLoading();
        _onloaded = true,
        util.hideLoading();
        that.setData({
          PointList: res,
          member: User,
          onloaded :_onloaded,
        })
      })
    }
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