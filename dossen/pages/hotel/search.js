// pages/hotel/search.js
var baseRQ = require("../../utils/models/BaseRQ.js");
var hotelService = require("../../utils/service/hotelService.js");
var commonService = require("../../utils/service/commonService.js");
var orderService = require("../../utils/service/orderService.js");
var util = require('../../utils/util.js');
var _currentCity = null;;
var _page = null;
var _keyword = null;
var _searchKeys = null;
var _options =null;
Page({
  data: {
    closeIocn: true,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    _page = this;
    wx.setNavigationBarTitle({
      title: '搜索目的地/品牌/酒店名称',
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    _keyword = null;
    // 页面显示
    util.showLoading();
    //var _options = commonService.getOrderSession();
    var cityCode = orderService.getOrderOptions("cityCode");
    var cityName = orderService.getOrderOptions("cityName")
    // if (!util.isNullOrEmpty(_options.cityCode) && !util.isNullOrEmpty(_options.cityName)) {
    //   _currentCity = { CityCode: _options.cityCode, CityName: _options.cityName };
    // } else {
    //   _currentCity = { CityCode: "22", CityName: "广州" };
    // }
    if(util.isNullOrEmpty(cityCode))
    {
       cityCode = orderService.setOrderOptions("cityCode","22");
       cityName = orderService.setOrderOptions("cityName","广州")
    }
    render();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  cityChange: function (event) {
    wx.navigateTo({
      url: 'hotelcity',
    })
  },
  keywordChange: function (event) {
    var value = event.detail.value;
    _keyword = value;
    render();
    console.log(value);
  },
  chooseKeys:function(e){
    orderService.setOrderOptions("longitude", e.currentTarget.dataset.longitude);
    orderService.setOrderOptions("latitude", e.currentTarget.dataset.latitude);
    orderService.setOrderOptions('searchKeys',e.currentTarget.dataset.key);
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //显示关闭图标
  keywordFocus: function (event) {
    var _this = this;
    _this.setData({
      closeIocn: false,
    })
  },
  //点击关闭图标
  closeTap: function (event) {
    var _this = this;
    _this.setData({
      closeIocn: true,
    })
  }
})

function render() {
  var request = baseRQ.getInstance().create();
  request.CityCode = orderService.getOrderOptions("cityCode");
  request.KeyWord = _keyword;
  _currentCity = {
    cityCode:orderService.getOrderOptions("cityCode"),
    cityName:orderService.getOrderOptions("cityName")
  }
  hotelService.HotelSearchKey(request, function (result) {
    var _searchKeys = result.SearchKeys;
    _page.setData({
      currentCity: _currentCity,
      searchKeys: _searchKeys,
      keyWord: _keyword
    });
    util.hideLoading();
  });
}