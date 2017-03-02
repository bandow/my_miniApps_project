// pages/order/orderCoupon.js
var util = require('../../utils/util.js');
var orderService = require('../../utils/service/orderService.js');
var baseRQ = require('../../utils/models/BaseRQ.js');
var _options = null;
var _page = null;
var _coupons = null;
Page({
  data: {
    type: '图片1'
  },
  couponList: function (event) {
    var that = this;
    var type = that.data.type === '图片1' ? '图片2' : '图片1';
    that.setData({
      type: type
    });
  },
  onLoad: function (options) {
    util.showLoading();
    wx.setNavigationBarTitle({
      title: '选择优惠劵',
    });

    // 页面初始化 options为页面跳转所带来的参数
    _page = this;
    // _options = JSON.parse(options.request);
    render();
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
  setStatus: function (e) {
    var couponCode = e.currentTarget.dataset.couponcode;
    for (var i = 0; i < _coupons.length; i++) {
      _coupons[i].checked = false;
      if (_coupons[i].CouponCode == couponCode) {
        _coupons[i].checked = true;
        //wx.setStorageSync('selectedCoupon', _coupons[i]);
        orderService.setOrderOptions('selectedCoupon', _coupons[i]);
      }
    }
    _page.setData({
      couponList: resetCoupon(_coupons)
    });
    util.showLoading();
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000);

  }
})


function render() {
  var request = baseRQ.getInstance().create();
  // request.HotelId = _options.HotelId;
  // request.RoomTypeId = _options.RoomTypeId;
  // request.StartDate = _options.StartDate;
  // request.EndDate = _options.EndDate;
  // request.MemberTypeId = _options.MemberTypeId;
  // request.BookType = _options.BookType;
  // request.TotalFee = _options.TotalFee;
  // request.MemberNo = _options.MemberNo;
  // request.ActivityCode = _options.ActivityCode;
  request.HotelId = orderService.getOrderOptions("hotelId");
  request.RoomTypeId = orderService.getOrderOptions("roomTypeId");
  request.StartDate =orderService.getOrderOptions("startDate");
  request.EndDate = orderService.getOrderOptions("endDate");
  request.MemberTypeId = orderService.getOrderOptions("memberTypeId");
  request.BookType = orderService.getOrderOptions("bookType");
  request.TotalFee = orderService.getOrderOptions("totalFee");
  request.MemberNo = orderService.getOrderOptions("memberNo");
  request.ActivityCode = orderService.getOrderOptions("activityCode");
  orderService.orderCouponQuery(request, function (res) {
    _coupons = res.Coupons;
    _page.setData({
      couponList: resetCoupon(_coupons)
    })
    console.log(_coupons);
    util.hideLoading();
  });
}

function resetCoupon(Coupons) {
  if (Coupons.length > 0) {
    for (var i = 0; i < Coupons.length; i++) {
      Coupons[i]['EndTime'] = Coupons[i]['EndTime'].replace('00:00:00', '');
      Coupons[i]['EnableHotels'] = Coupons[i]['EnableHotels'].length <= 1 ? "适用全部酒店" : "适用" + Coupons[i]['EnableHotels'].length + "家门店"
    }
  }
  return Coupons;
};
