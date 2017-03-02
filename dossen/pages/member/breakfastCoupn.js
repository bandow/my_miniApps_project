// pages/member/breakfastCoupn.js
var baseRQ = require('../../utils/models/BaseRQ.js');
var memberService = require('../../utils/service/memberService.js');
var commonService = require('../../utils/service/commonService.js');
var util = require('../../utils/util.js');
var User = null;

Page({
  data: {
    Coupons: [],
    member: [],
  },
  onLoad: function (options) {
    var that = this;
    var CouponType = [];
    wx.setNavigationBarTitle({
      title: '我的早餐券',
    })
    User = memberService.getCurrentUser();
    if (util.isNullOrEmpty(User)) {
      //跳转至登录
      wx.redirectTo({
        url: '../member/login'
      });
    } else {
      util.showLoading();
      //优惠券列表(分页)
      var request = baseRQ.getInstance().create();
      request.MemberNo = User.MemberNo;
      CouponType.push(options.CouponType)
      request.CouponType = CouponType;
      request.NeedDetail = true;
      memberService.MemberCouponQuery(request, function (res) {
        util.hideLoading();
        that.setData({
          Coupons: resetCoupon(res),
          member: User
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
  },
  onReachBottom: function() {
     //var 
    // Do something when page reach bottom.
     //console.log('circle 下一页');
 }
})

function resetCoupon(Coupons) {
  if (Coupons.length > 0) {
    for (var i = 0; i < Coupons.length; i++) {
      Coupons[i]['EndTime'] = Coupons[i]['EndTime'].replace('00:00:00', '');
      Coupons[i]['EnableHotels'] = Coupons[i]['EnableHotels'].length <= 1 ? "适用全部酒店" : "适用" + Coupons[i]['EnableHotels'].length + "家门店"
    }
  }
  return Coupons;
};


