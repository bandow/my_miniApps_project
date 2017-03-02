// pages/common/service.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '电话客服',
    })
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
  makePhoneCall: function (e) {
    wx.showModal({
      title: '温馨提示',
      content: '你确定要拨打客服电话',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
          phoneNumber: '400-700-7899',
        })
        }
      }
    });
  },
})