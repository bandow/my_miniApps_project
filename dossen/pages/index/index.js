var apiService = require('../../utils/service/apiService.js');
var memberService = require('../../utils/service/memberService.js');
var commonService = require('../../utils/service/commonService.js');
var orderService = require('../../utils/service/orderService.js');
var util = require('../../utils/util.js');
var baseRQ = require('../../utils/models/BaseRQ.js');
var apiToken = null;
var apiSettings = null;
var userToken = null;

var page = null;
var _options = null;
var _user = null;
var _onloaded = false;
var _onshow = false;
var _dayNum = null;
var _minDate = null;
var _maxDate = null;
var _tempStartDate = null;
var _location = null;
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    val: {},
    winWidth: 0,
    winHeight: 0,
    maskContainer: true,
    maskDayContainer: true,
    currentAddress: null,
    currentBussiness: null,
    cityName: "",
  },

  //点击日历
  bindDateChange: function (e) {
    _tempStartDate = e.detail.value
    this.setData({
      date: e.detail.value,
      maskDayContainer: false,
      maskContainer: false,
    })
  },

  selectDayNum: function (e) {
    var day = e.currentTarget.dataset.day;
    this.setData({
      maskContainer: true,
      maskDayContainer: true,
      dayNum: day
    })
    orderService.setOrderOptions("startDate", _tempStartDate);
    orderService.setOrderOptions("endDate", util.getStringDate(util.addDate(new Date(_tempStartDate), parseInt(day))));
    orderService.setOrderOptions("dayNum", day);
    renderOrder();
  },

  hotelQuery: function (e) {
    var url = '../hotel/list?request=' + (JSON.stringify(_options))
    wx.navigateTo({
      url: url
    });
  },

  resetLocation: function (e) {
    initLocation(function () {
      renderOrder();
    })
  },

  chooseCity: function (e) {
    wx.navigateTo({
      url: '../hotel/hotelcity',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onLoad: function (options) {
    orderService.setOrderOptions("startDate", null);
    orderService.setOrderOptions("endDate", null);
    page = this;
    _minDate = new Date();
    _maxDate = util.addDate(_minDate, 60);
    page.setData({
      onload: _onloaded,
      minDate: _minDate,
      maxDate: _maxDate
    });
    page.setData({
      cityCode: "22",
      cityName: "广州"
    });
    //initDate();
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        page.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
    });
    _options = options;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        _location = res;
        init(function () {
          initLocation(function () {
            _onloaded = true;
            util.hideLoading();
          });
        });
      },
      fail: function (e) {
        init(function () {
        orderService.setOrderOptions("cityCode","22");
        orderService.setOrderOptions("cityName", "广州");
        orderService.setOrderOptions("longitude", 113.2759952545166);
        orderService.setOrderOptions("latitude", 23.117055306224895);
        page.setData(
          {
            cityName: orderService.getOrderOptions("cityName")
          });
            _onloaded = true;
            util.hideLoading();
        });

      }
    });



    //wx.setStorageSync('CURRENT_USER', null);



  },
  onShow: function (e) {
    initDate();
    var cityName = orderService.getOrderOptions("cityName");
    page.setData({
      cityName: cityName,
    })
  }
})

function initDate() {
  //重新设置日期
  _onloaded = true;
  _onshow = true;
  var sDate = orderService.getOrderOptions("startDate");
  var eDate = orderService.getOrderOptions("endDate");
  if (util.isNullOrEmpty(sDate)) {
    sDate = util.dateFormat(new Date(), 'yyyy-MM-dd');
    orderService.setOrderOptions("startDate", sDate);
  }
  if (util.isNullOrEmpty(eDate)) {
    eDate = util.dateFormat(util.addDate(new Date(sDate), 1), 'yyyy-MM-dd');
    orderService.setOrderOptions("endDate", eDate);
  }
  var dayNum = util.dateDiff(new Date(sDate), new Date(eDate));
  orderService.setOrderOptions("dayNum", dayNum);
  var startDateDesc = util.dateFormat(new Date(sDate), 'MM月dd日');
  var endDateDesc = util.dateFormat(new Date(eDate), 'MM月dd日');
  page.setData({
    startDate: sDate,
    endDate: eDate,
    numDay: util.dateDiff(new Date(sDate), new Date(eDate)),
    onshow: _onshow,
    onloaded: _onloaded,
    dayNum: dayNum,
    startDateDesc: startDateDesc,
    endDateDesc: endDateDesc,
  });
  //commonService.setOrderSession(_options);
}

//重置数据
function renderOrder() {
  util.showLoading();
  var sDate = orderService.getOrderOptions("startDate");
  var eDate = orderService.getOrderOptions("endDate");
  //重新设置日期
  _onloaded = true;
  _onshow = true;
  _dayNum = util.dateDiff(new Date(sDate), new Date(eDate));
  var startDateDesc = util.dateFormat(new Date(sDate), 'MM月dd日');
  var endDateDesc = util.dateFormat(new Date(eDate), 'MM月dd日');
  page.setData({
    startDate: sDate,
    endDate: eDate,
    numDay: util.dateDiff(new Date(sDate), new Date(eDate)),
    onshow: _onshow,
    onloaded: _onloaded,
    dayNum: _dayNum,
    startDateDesc: startDateDesc,
    endDateDesc: endDateDesc,
  });
  //commonService.setOrderSession(_options);
  util.hideLoading();
}
function init(callback) {
  util.showLoading();
  apiService.getApiToken(false, function (result) {
    apiToken = result;
    apiService.getApiSettings(function (result) {
      apiSettings = result;
      apiService.getUserToken(function (result) {
        // wxLogin(function () {
        // memberService.getCurrentUserForIndex({
        //   url: "../order/confirm",
        //   options: _options
        // }, function (member) {
        // setTimeout(function () {
        //   var url = '../order/confirm?request=' + (JSON.stringify(_options))
        //   wx.redirectTo({
        //     url: url
        //   });
        // }, 1000);
        callback();
        // });
        util.hideLoading();
        // });
      });
    });
  });
}




function initLocation(callback) {
  // wx.getLocation({
  //   type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
  //   success: function (res) {
  util.showLoading();
  console.log(_location);
  var request = baseRQ.getInstance().create();
  request.Longitude = _location.longitude;
  request.Latitude = _location.latitude;
  commonService.queryCityCodeByLocation(request, function (e) {
    ;
    page.setData({
      cityName: e.CityList[0].CityName,
    })
    orderService.setOrderOptions("cityCode", e.CityList[0].CityCode);
    orderService.setOrderOptions("cityName", e.CityList[0].CityName);
    orderService.setOrderOptions("longitude", _location.longitude);
    orderService.setOrderOptions("latitude", _location.latitude);
    callback();
  });
  // },
  // fail: function () {
  //     orderService.setOrderOptions("cityCode","22");
  //     orderService.setOrderOptions("cityName","广州");
  //     orderService.setOrderOptions("longitude",113.2759952545166);
  //     orderService.setOrderOptions("latitude",23.117055306224895);
  //   page.setData(
  //      {
  //         cityName: orderService.getOrderOptions("cityName")
  //      }
  //   )
  //   if(callback!=null)
  //   {
  //      callback();
  //   }

  // },
  // complete: function () {
  //   // complete

  // }
  // })

}
