// pages/order/success.js
var baseRQ = require('../../utils/models/BaseRQ.js');
var orderService = require('../../utils/service/orderService.js');
var hotelService = require('../../utils/service/hotelService.js');
var memberService = require('../../utils/service/memberService.js');
var util = require('../../utils/util.js');
var _options = null;
var _page = null;
var _order = null;
Page({
  data: {},
  onLoad: function (options) {
    _page = this;
    _options = options;
    render();
    wx.setNavigationBarTitle({
      title: "预定成功"
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

function render() {
  var request = baseRQ.getInstance().create();
  request.OrderId = _options.orderId;
  // 页面初始化 options为页面跳转所带来的参数
  orderService.orderQuery(request, function (orderQueryResponse) {
    _order = orderQueryResponse.Orders[0];
    var checkInDate = new Date(_order.CheckInDate);
    var checkInDateDesc = formatDayTime(_order.CheckInDate);
    _page.setData({
      order: _order,
      numDay: util.dateDiff(new Date(_order.CheckInDate), new Date(_order.CheckOutDate)),
      checkInDateDesc: checkInDateDesc,
      dayOfWeek: util.getDayOfWeek(checkInDate.getDay())
    });
  });
}
function formatDayTime(time) {
  var array = [];
  time = time.replace(/-/g, ':').replace(' ', ':');
  time = time.split(':');
  var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
  return time[1] + "月" + time[2] + "日";
}

function getDayOfWeek(DataTime) {
  var weekday=["周日","周一","周二","周三","周四","周五","周六"];
  return weekday[DataTime.getDay()];
}