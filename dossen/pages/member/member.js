// pages/member/member.js
var baseRQ = require('../../utils/models/BaseRQ.js');
var memberService = require('../../utils/service/memberService.js');
var commonService = require('../../utils/service/commonService.js');
var util = require('../../utils/util.js');
var User = null;
var _onloaded = false;
Page({
  data: {
    member: [],
    onloaded: false,
  },
  MemberCoupon: function () {
    wx.navigateTo({
      url: '../member/coupon?CouponType=COUPON'
    })
  },
  MemberPoint: function () {
    wx.navigateTo({
      url: '../member/PointDetail'
    })
  },
  MemberBreakfast: function () {
    wx.navigateTo({
      url: '../member/breakfastCoupn?CouponType=BREAKFAST'
    })
  },
  mySettings: function (e) {
    // wx.navigateTo({
    //   url: '../member/settings',
    // })
    wx.redirectTo({
      url: '../member/login?Method=Login',
    })
  },
  orderListTap: function () {
    wx.switchTab({
      url: '../order/list',
    })
  },
  onLoad: function (options) {
    //var window = Window;
    util.showLoading();
    var that = this;
    wx.setNavigationBarTitle({
      title: '个人中心',
    });
    // 页面初始化 options为页面跳转所带来的参数 tips 隔一段時間更新
    User = memberService.getCurrentUser();
    if (util.isNullOrEmpty(User)) {
      //跳转至登录
      wx.redirectTo({
        url: '../member/login'
      });
    } else {
      //会员查询
      var request = baseRQ.getInstance().create();
      request.Key = User.MemberNo;
      request.QueryType = 'MEMBERNO';
      request.NeedEvents = true;
      request.NeedAvatar = true;
      memberService.MemberQuery(request, function (user) {
        //查询会员数量信息
        request.MemberNO = User.MemberNo;
        request.Keys = ['COUPON', 'BREAKFAST']
        memberService.MemberNums(request, function (o) {
          util.hideLoading();
          user.Nums = o.Nums;
          memberService.setCurrentUser(user);
          _onloaded = true;
          that.setData({
            member: user,
            onloaded: _onloaded,
          })
        });
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