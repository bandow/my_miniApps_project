// pages/order/item.js
var baseRQ = require('../../utils/models/BaseRQ.js');
var memberService = require('../../utils/service/memberService.js');
var orderService = require('../../utils/service/orderService.js');
var util = require('../../utils/util.js');
var User = null;
var _onloaded =false;
var _page = null;
  Page({
    data: {
      order: [],
      onloaded: false,
    },
    orderItem: function () {
      wx.navigateTo({
        url: '../order/item'
      })
    },
    onLoad: function (options) {
      _onloaded = false;
      // 页面初始化 options为页面跳转所带来的参数
      var that = this;
      _page = that;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            winWidth: res.windowWidth,
            winHeight: res.windowHeight,
          });
        }
      });
      //获取订单数据
      User = memberService.getCurrentUser();
      if (util.isNullOrEmpty(User)) {
        //跳转至登录
        wx.redirectTo({
          url: '../member/login'
        });
      } else {
        //订单列表查询
        var request = baseRQ.getInstance().create();
        request.MemberNo = User.MemberNo;
        request.NeedEvents = true;
        request.OrderId = options.OrderId;
        orderService.orderQuery(request, function (res) {
          var orders = resetOrder(res.Orders);
          _onloaded = true;
          that.setData({
            order: orders[0],
            onloaded: _onloaded,
          })
        })
      }
    },
    //取消订单
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
              //订单列表查询
              var param = baseRQ.getInstance().create();
              param.MemberNo = User.MemberNo;
              param.NeedEvents = true;
              param.OrderId = e.target.id;
              orderService.orderQuery(param, function (res) {
                var orders = resetOrder(res.Orders);
                _onloaded = true;
                _page.setData({
                  order: orders[0],
                  onloaded: _onloaded,
                })
                util.hideLoading();
              })

              //刷新当前页面
              // wx.redirectTo({
              //   url: '../order/item?OrderId=' + e.target.id,
              // });
            })
          }
        }
      });
    },
    onReady: function () {
      // 页面渲染完成
      wx.setNavigationBarTitle({
        title: '订单详情'
      })
    },
    makePhoneCall: function (e) {
      wx.showModal({
        title: '温馨提示',
        content: '你确定要拨打客服电话',
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: e.target.id,
            })
          }
        }
      });
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