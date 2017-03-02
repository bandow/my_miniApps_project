// pages/hotel/hotelList/hotelList.js
var BaseRQ = require('../../utils/models/BaseRQ.js');
var hotelService = require('../../utils/service/hotelService.js');
var orderService = require('../../utils/service/orderService.js');
var commonService = require('../../utils/service/commonService.js');
var util = require('../../utils/util.js');
var configs = require('../../utils/configs.js');
var _options = null;
var _hotelList = null;
var page = null;
var _hotel = [];
var _staticUrl = configs.getInstance().file_url + '/StaticFile';
var AreaList = [];
var _tempStartDate = null;
var _dayNum = null;
var _minDate = null;
var _maxDate = null;
var _onloaded = false;
var _onshow = false;
var _sortArray = [
  { 'Name': '综合排序', 'key': 'DEFAULT' },
  { 'Name': '距离最近', 'key': 'DISTINCT' },
  { 'Name': '评分最优', 'key': 'GRADE' },
  { 'Name': '价格最低', 'key': 'PRICE' },
];
var _brandCodeArray = [
  { 'logoIcon': '/images/icon_logo_csbj_unchecked@3x.png', 'logoIconA': '/images/icon_logo_csbj_checked@3x.png', 'Name': '城市便捷', 'key': 'CSBJ' },
  { 'logoIcon': '/images/icon_logo_yc_gray@3x.png', 'logoIconA': '/images/icon_logo_yc_checked@3x.png', 'Name': '怡程', 'key': 'YC' },
  { 'logoIcon': '/images/icon_logo_ys_gray@3x.png', 'logoIconA': '/images/icon_logo_ys_checked@3x.png', 'Name': '宜尚', 'key': 'YS' },
  { 'logoIcon': '/images/icon_logo_jt_unchecked@3x.png', 'logoIconA': '/images/icon_logo_jt_checked@3x.png', 'Name': '精途', 'key': 'JT' },
];
var _nearbyArray = [
  { 'Name': '不限', 'key': 0 },
  { 'Name': '3公里', 'key': 3000 },
  { 'Name': '5公里', 'key': 5000 },
  { 'Name': '10公里', 'key': 10000 },
];
Page({
  data: {
    hiddenLoading: true,
    latitude: '',
    longitude: '',
    hotelList: [],
    staticUrl: _staticUrl,
    cityName: '',
    startDateDesc: '',
    maskDayContainer: true,
    maskContainer: true,
    //笼罩层
    mask: false,
    //距离最近
    distanceList: false,
    selected2: false,
    selected3: false,
    list1: true,
    list2: true,
    list3: true,
    distancetext: '距离最近',
    areatext: '区域位置',
    selecttext: '筛选',
    BusinessList: [],
    AreaList: [],
    areaListLi1: true,
    areaListLi4: true,
    right1: true,
    right4: true,
    onloaded :false,
    windowHeight:0,
    windowWidth:0
  },
  //交互列表一级标题
  //距离
  selecListTap1: function (e) {
    this.setData({
      distanceList: true,
      mask: true,
      selected2: false,
      selected3: false,
      list1: false,
      list2: true,
      list3: true,
    })
  },
  //区域位置
  selecListTap2: function () {
    this.setData({
      distanceList: false,
      mask: true,
      selected2: true,
      selected3: false,
      list1: true,
      list2: false,
      list3: true,
    })
  },
  //筛选
  selecListTap3: function () {
    this.setData({
      distanceList: false,
      mask: true,
      selected2: false,
      selected3: true,
      list1: true,
      list2: true,
      list3: false,

    })
  },

  //交互距离最近二级标题

  //交互笼罩层
  maskTap: function () {
    this.setData({
      distanceList: false,
      mask: false,
      selected2: false,
      selected3: false,
      list1: true,
      list2: true,
      list3: true,
    })
  },

  //跳转到详情页
  hotelInfo: function (e) {
    _options.HotelId = e.currentTarget.dataset.hotelid;
    if(!(e.currentTarget.dataset.status=="OPEN"))
       return;
    orderService.setOrderOptions("hotelId", _options.HotelId);
    var url = '../hotel/item'
    wx.navigateTo({
      url: url,
    });
  },

  distanceList: function (e) {
    page.setData({
      selected2: false,
      selected3: false,
      selected1: true,
      mask: true,
    })
  },
  //
  areaList: function (e) {
    page.setData({
      selected1: false,
      selected3: false,
      selected2: true,
      mask: true,
    })
  },

  liArea1: function (e) {
    page.setData({
      areaListLi1: true,
      areaListLi2: false,
      areaListLi3: false,
      right1: true,
      right2: false,
      right3: false,
    })
  },
  //商圈
  liArea2: function (e) {
    var request = BaseRQ.getInstance().create();
    request.CityCode = orderService.getOrderOptions("cityCode");
    hotelService.BusinessQuery(request, function (e) {
      e.SearchKeys.unshift({ 'Key': '不限' })
      _hotel.BusinessList = e.SearchKeys;
      page.setData({
        areaListLi1: false,
        areaListLi2: true,
        areaListLi3: false,
        right1: false,
        right2: true,
        right3: false,
        list2: true,
        BusinessList: e.SearchKeys,
      })
    })
  },
  //区域
  liArea3: function (e) {
    var request = BaseRQ.getInstance().create();
    request.CityCode = orderService.getOrderOptions("cityCode");
    hotelService.AreaQuery(request, function (e) {
      e.SearchKeys.unshift({ 'Key': '不限' })
      _hotel.AreaList = e.SearchKeys,
        page.setData({
          areaListLi1: false,
          areaListLi2: false,
          areaListLi3: true,
          right1: false,
          right2: false,
          right3: true,
          list2: true,
          AreaList: e.SearchKeys,
        })
    })
  },

  liArea4: function (e) {
    page.setData({
      areaListLi4: true,
      right4: true,
    })
  },

  //排序切换
  resetSortFocus: function (e) {
    changeSortFocus(e.currentTarget.dataset.index);
    //修改酒店查询条件
    resetSort(e);
  },

  //附近切换
  resetNearbyFocus: function (e) {
    changeNearByFocus(e.currentTarget.dataset.index);
    //修改酒店查询条件
    resetNearBy(e);
  },

  //商圈切换
  tworightLi2: function (e) {
    changeBusinessFocus(e.currentTarget.dataset.index);
    //修改酒店查询条件
    resetBussiness(e);
  },

  //品牌切换
  resetBrandNameFocus: function (e) {
    changeBrandNameFocus(e.currentTarget.dataset.index);
    //修改酒店查询条件
    resetBrandName(e);
  },

  //区域切换
  threerightLi2: function (e) {
    changeAreaFocus(e.currentTarget.dataset.index);
    resetArea(e);
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
  //选择天数
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
  //选择城市
  selectCity: function (e) {
    wx.navigateTo({
      url: '../hotel/hotelcity',
    })
  },
  selectDestination: function (e) {
    wx.navigateTo({
      url: '../hotel/search'
    })
  },

  onLoad: function (options) {
    util.showLoading();
    page = this;
    //设置时间区间
    _minDate = new Date();
    _maxDate = util.addDate(_minDate, 60);
    if (options.request != null) {
      _options = JSON.parse(options.request);
    }
    else {
      _options = commonService.getOrderSession();
    }
    //_onloaded = true;
    page.setData({
      BrandName: _brandCodeArray,
      SortArray: _sortArray,
      NearByArray: _nearbyArray,
      minDate: _minDate,
      maxDate: _maxDate,
      //onloaded:_onloaded,
    })
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '酒店列表'
    })
  },
  onShow: function () {
    util.showLoading();
    //初始化酒店查询请求参数
    _onloaded = false;
    initDate();
    _options.NeedRoomTypeDisplay = true;
    _options.NeedTag = true;
    _options.latitude = orderService.getOrderOptions("latitude");
    _options.longitude = orderService.getOrderOptions("longitude");
    _options.searchKeys =util.isNullOrEmpty(orderService.getOrderOptions("searchKeys"))?'输入目的地名称':orderService.getOrderOptions("searchKeys");
    _options.RoomPriceType = 'NS';
    _options.Sort = 'DISTINCT';
    _options.SearchRadius = 0;
    _options.NeedDistance = true;
    _options.HotelId = null;
    //_options.NeedDetail = true;
    if (_options.longitude != null && _options.latitude != null) {
      _options.NeedDistance = true;
      _options.CurrentPoint = null;
      _options.CurrentPoint = { 'MapType': 'B', 'Latitude': _options.latitude, 'Longitude': _options.longitude };
    }
    _options.CityCode = orderService.getOrderOptions("cityCode")
    initHoltelList(_options, function (e) {
      
      _onloaded = true;
      page.setData({
        hotelList: _hotelList,
        cityName: orderService.getOrderOptions("cityName"),
        onloaded: _onloaded,
        searchKeys:_options.searchKeys,
      });
      util.hideLoading();
    });

     wx.getSystemInfo( {
      success: ( res ) => {
        this.setData( {
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})

function initHoltelList(request, callback) {
  hotelService.HotelQuery(request, function (result) {
    _hotelList = new Array();
    if (result.Hotels.length > 0) {
      for (var i = 0; i < result.Hotels.length; i++) {
        if (!util.isNullOrEmpty(result.Hotels[i].Distance)) {
          result.Hotels[i].Distance = parseInt(result.Hotels[i].Distance);
        }
        else {
          result.Hotels[i].Distance = 0;
        }
        _hotelList[i] = result.Hotels[i];
      }
      callback(_hotelList)
    }
    else
    {
        _hotelList = new Array();
        callback(_hotelList);
    }
  },
  )
}

//重置排序
function resetSort(e) {
  var searchKey = e.currentTarget.dataset.key;
  var request = BaseRQ.getInstance().create();
  request = _options;
  request.HotelId = null;
  request.Sort = searchKey;
  HotelQuery(request);
  page.setData({
    distancetext: e.currentTarget.dataset.name
  })
}

//重置附近
function resetNearBy(e) {
  var searchKey = e.currentTarget.dataset.key;
  var request = BaseRQ.getInstance().create();
  request = _options;
  request.HotelId = null;
  request.SearchRadius = searchKey;
  HotelQuery(_options);
  page.setData({
    areatext: e.currentTarget.dataset.name
  })
}

//重置商圈
function resetBussiness(e) {
  var searchKey = e.currentTarget.dataset.key;
  var request = BaseRQ.getInstance().create();
  request = _options;
  request.HotelId = null;
  request.HotelQueryCondition = [];
  request.HotelQueryCondition.push({ 'Key': 'BUSINESSAREA', 'Value': searchKey });
  HotelQuery(request);
  page.setData({
    areatext: e.currentTarget.dataset.name
  })
}
//重置行政区
function resetArea(e) {
  var searchKey = e.currentTarget.dataset.key;
  var request = BaseRQ.getInstance().create();
  request = _options;
  request.HotelId = null;
  request.HotelQueryCondition = [];
  request.HotelQueryCondition.push({ 'Key': 'AREAID', 'Value': searchKey });
  HotelQuery(request);
  page.setData({
    areatext: e.currentTarget.dataset.name
  })
}

//重置品牌
function resetBrandName(e) {
  var searchKey = e.currentTarget.dataset.key;
  var request = BaseRQ.getInstance().create();
  request = _options;
  request.HotelId = null;
  request.QueryConditions = [];
  request.QueryConditions.push({ 'Key': 'BRANDCODE', 'Value': searchKey, });
  HotelQuery(request);
  page.setData({
    selecttext: e.currentTarget.dataset.name
  })
}

//酒店查询
function HotelQuery(request) {
  util.showLoading();
  initHoltelList(request, function (res) {
    page.setData({
      hotelList: res,
    })
    util.hideLoading();
  })
}

//排序
function changeSortFocus(index) {
  var status = _sortArray[index].display;
  if (status == null)
    status = false;
  for (var i = 0; i < _sortArray.length; i++) {
    _sortArray[i].display = false;
  }
  _sortArray[index].display = !status;
  page.setData({
    mask: false,
    distanceList: false,
    list1: true,
    SortArray: _sortArray,
  })

}
//附近
function changeNearByFocus(index) {
  var status = _nearbyArray[index].display;
  if (status == null)
    status = false;
  for (var i = 0; i < _nearbyArray.length; i++) {
    _nearbyArray[i].display = false;
  }
  _nearbyArray[index].display = !status;
  page.setData({
    mask: false,
    selected2: false,
    list2: true,
    NearByArray: _nearbyArray,
  })
}

function changeAreaFocus(index) {
  var NewAreaList = _hotel.AreaList;
  var status = NewAreaList[index].display;
  if (status == null)
    status = false;
  for (var i = 0; i < NewAreaList.length; i++) {
    NewAreaList[i].display = false;
  }
  NewAreaList[index].display = !status;
  page.setData({
    AreaList: NewAreaList,
    mask: false,
    selected2: false,
    RliList001: false,
    list2: true,
  })
}

function changeBusinessFocus(index) {
  var NewBusinessList = _hotel.BusinessList;
  var status = NewBusinessList[index].display;
  if (status == null)
    status = false;
  for (var i = 0; i < NewBusinessList.length; i++) {
    NewBusinessList[i].display = false;
  }
  NewBusinessList[index].display = !status;
  page.setData({
    BusinessList: NewBusinessList,
    mask: false,
    selected2: false,
    RliList01: false,
    list2: true,
  })
}

function changeBrandNameFocus(index) {
  var status = _brandCodeArray[index].display;
  if (status == null)
    status = false;
  for (var i = 0; i < _brandCodeArray.length; i++) {
    _brandCodeArray[i].display = false;
  }
  _brandCodeArray[index].display = !status;
  page.setData({
    mask: false,
    selected3: false,
    list3: true,
    BrandName: _brandCodeArray,
  })
}

function initDate() {
  //重新设置日期
  // _onloaded = true;
  // _onshow = true;
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
    // onshow: _onshow,
    // onloaded: _onloaded,
    dayNum: dayNum,
    startDateDesc: startDateDesc,
    endDateDesc: endDateDesc,
  });
}

//重置数据
function renderOrder() {
  util.showLoading();
  var sDate = orderService.getOrderOptions("startDate");
  var eDate = orderService.getOrderOptions("endDate");
  //重新设置日期
  // _onloaded = true;
  // _onshow = true;
  _dayNum = util.dateDiff(new Date(sDate), new Date(eDate));
  var startDateDesc = util.dateFormat(new Date(sDate), 'MM月dd日');
  var endDateDesc = util.dateFormat(new Date(eDate), 'MM月dd日');
  page.setData({
    startDate: sDate,
    endDate: eDate,
    numDay: util.dateDiff(new Date(sDate), new Date(eDate)),
    // onshow: _onshow,
    // onloaded: _onloaded,
    dayNum: _dayNum,
    startDateDesc: startDateDesc,
    endDateDesc: endDateDesc,
  });
  util.hideLoading();
}