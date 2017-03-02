// pages/hotel/index.js
var BaseRQ = require('../../utils/models/BaseRQ.js');
var hotelService = require('../../utils/service/hotelService.js');

Page({
  data: {},
  onLoad: function (options) {

  },
  onLoad: function (options) {    // 页面初始化 options为页面跳转所带来的参数
    // 生命周期函数--监听页面加载
    // var request = BaseRQ.getInstance().create();
    //  request.hotelID = '0020002';
    // var that =this;
    //   hotelService.HotelQuery(request, function (result){
    //     var res=result;
    //     if(result.Hotels.length>0)
    //     {
    //       that.setData({
    //        hotelInfo:result.Hotels
    //       });      
    //     }     
    //   })
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

  //跳转酒店列表
  listpage: function () {
    wx.navigateTo({
      url: '../hotel/list'
    })
  },
  
  //获取经纬度
  getLocation: function (e) {
    console.log(e)
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
      }
    })
  },
  //根据经纬度在地图上显示
  openLocation: function (e) {
    var value = e.detail.value
    wx.openLocation({
      longitude: Number(value.longitude),
      latitude: Number(value.latitude)
    })
  }
})
