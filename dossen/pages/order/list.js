// pages/order/list.js
var baseRQ = require('../../utils/models/BaseRQ.js');
var memberService = require('../../utils/service/memberService.js');
var orderService = require('../../utils/service/orderService.js');
var util = require('../../utils/util.js');
var User = null;
var _onloaded = false;
var _page = null;
Page({
  data: {
    orders: [],
    onloaded: false,
  },
  orderItem: function () {
    wx.navigateTo({
      url: '../order/item'
    })
  },
  onLoad: function (options) {
    _page = this;
    _onloaded = false;
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
    });

  },
  cancel: function (e) {
    var request = baseRQ.getInstance().create();
    var member = memberService.getCurrentUser();
    request.OrderId = e.target.id;
    request.MemberNo = member.MemberNo;
    request.HotelId = e.target.dataset.hid;
    wx.showModal({
      title: '温馨提示',
      content: '您确定取消订单？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          util.showTip("取消中");
          orderService.orderCancel(request, function (res) {
            util.showLoading();
            var request = baseRQ.getInstance().create();
            request.MemberNo = User.MemberNo;
            request.NeedEvents = true;
            orderService.orderQuery(request, function (res) {
              _onloaded = true,
                _page.setData({
                  orders: resetOrder(res.Orders),
                  onloaded: _onloaded,
                })
              util.hideLoading();
            });
            // //刷新当前页面
            // wx.redirectTo({
            //   url: '../order/list'
            // });
          })
        }
      }
    });
  },
  gotoDetialPage: function (e) {
    var orderId = e.currentTarget.id;
    wx.navigateTo({
      url: '../order/item?OrderId=' + orderId,
    });
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
  },
  onShow: function () {
    util.showLoading();
    // 页面显示
    //获取订单数据
    User = memberService.getCurrentUser({
      url: "../order/list"
    }, "SWITCH");
    if (util.isNullOrEmpty(User)) {
      //跳转至登录
      // wx.redirectTo({
      //   url: '../member/login'
      // });
      return;
    }
    //订单列表查询
    var request = baseRQ.getInstance().create();
    request.MemberNo = User.MemberNo;
    request.NeedEvents = true;
    orderService.orderQuery(request, function (res) {
      _onloaded = true,
        _page.setData({
          orders: resetOrder(res.Orders),
          onloaded: _onloaded,
        })
      util.hideLoading();
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
function resetOrder(orders) {
  if (orders.length > 0) {
    for (var i = 0; i < orders.length; i++) {
      var Events = [];
      for (var j = 0; j < orders[i].Events.length; j++) {
        if (orders[i].Events[j].Value == "RESERVATION_CANCEL") {
          Events.push(orders[i].Events[j])
        }
      }
      orders[i].Events = Events;
      //修改订单状态文字
      switch (orders[i].Status) {
        case "RESERVATION":
          orders[i].Status = "预定中";
          break;
        case "CHECKIN":
          orders[i].Status = "入住中";
          break;
        case "CHECKOUT":
          orders[i].Status = "已离店";
          break;
        case "CANCEL":
          orders[i].Status = "取消";
          break;
        case "NOSHOW":
          orders[i].Status = "预定未到";
          break;
        default:
          orders[i].Status = "";
      }
      orders[i]['CheckInDate'] = orders[i]['CheckInDate'].replace('00:00:00', '');
      orders[i]['CheckOutDate'] = orders[i]['CheckOutDate'].replace('00:00:00', '');
    }
  }
  return orders;
};