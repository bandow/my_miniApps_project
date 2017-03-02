var BaseRQ = require('../../utils/models/BaseRQ.js');
var hotelService = require('../../utils/service/hotelService.js');
var commonService = require('../../utils/service/commonService.js');
var orderService = require('../../utils/service/orderService.js');
var util = require('../../utils/util.js');

var _CityCategories = new Array();
var _cityList = null;
var _page = null;
var _options = null;
Page({
  data: {
    value: '',
    cityShow: true,
    cityHide: false,
    cityList: [],
    hotCityList: [],
  },
  bindConfirm: function (event) {


  },
  bindKeyInput: function (event) {
    if (util.isNullOrEmpty(event.detail.value)) {
      CategoryCity(_cityList);
    } else {
      var letter = event.detail.value.toUpperCase();
      var arr = new Array();
      for (var i = 0; i < _cityList.length; i++) {
        var city = _cityList[i];
        if (!util.isNullOrEmpty(city.CityName) && city.CityName.toUpperCase().indexOf(letter) != -1) {
          arr.push(city);
          continue;
        }
        if (!util.isNullOrEmpty(city.JianPin) && city.JianPin.toUpperCase().indexOf(letter) != -1) {
          arr.push(city);
          continue;
        }
        if (!util.isNullOrEmpty(city.PinYin) && city.PinYin.toUpperCase().indexOf(letter) != -1) {
          arr.push(city);
          continue;
        }
      }
      CategoryCity(arr);
    }
  },
  chooseCity: function (event) {
    var city = event.currentTarget.dataset.city;
    // var _options = commonService.getOrderSession();
    // _options.cityCode = city.CityCode;
    // _options.cityName = city.CityName;
    // commonService.setOrderSession(_options);
    orderService.setOrderOptions("cityCode",city.CityCode);
    orderService.setOrderOptions("cityName",city.CityName);
    orderService.setOrderOptions('searchKeys',null);
    // wx.navigateBack({
    //   delta: 1, // 回退前 delta(默认为1) 页面
    // });
    // wx.navigateTo({
    //   url: '../hotel/list',
    //   success: function(res){
    //     // success
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
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
  onLoad: function (options) {
    _page = this;
    _CityCategories = new Array();
    wx.setNavigationBarTitle({
      title: '选择城市',
      success: function (res) {
        // success
      }
    });
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    util.showLoading();
    var request = BaseRQ.getInstance().create();
    var that = this;
    //_options = commonService.getOrderSession();
    hotelService.GetCityList(request, function (result) {
      _cityList = result.CityList;
      CategoryCity(_cityList);
      if (result.CityList.length > 0) {
        that.setData({
          //cityList: result.CityList,
          hotelCityList: result.HotCityList.splice(0, 12),
          cityName:orderService.getOrderOptions("cityName"),
        });
      }
      util.hideLoading();
    });
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})

function resetCityList(cityList) {

}

function CategoryCity(cityList) {
  _CityCategories = new Array();
  if (cityList != null && cityList.length > 0) {
    for (var i = 0; i < cityList.length; i++) {
      var city = cityList[i];
      var letter = null;
      if (util.isNullOrEmpty(city.PinYin)) {
        letter = "其他";
      }
      else {
        letter = city.PinYin.substring(0, 1).toUpperCase();
      }
      var element = findElement(letter);
      if (element == null) {
        var obj = new Object();
        obj.Code = letter;
        obj.CityList = new Array();
        obj.CityList.push(city);
        _CityCategories.push(obj);
      }
      else {
        element.CityList.push(city);
      }
    }
  }
  _CityCategories = _CityCategories.sort(function (a, b) {
    return a.Code > b.Code ? 1 : -1;
  });
  _page.setData({
    cityCategories: _CityCategories,
  });
}


function findElement(letter) {
  if (util.isNullOrEmpty(letter))
    return null;
  for (var i = 0; i < _CityCategories.length; i++) {
    var category = _CityCategories[i];
    if (category.Code == letter)
      return category;
  }
  return null;
}

