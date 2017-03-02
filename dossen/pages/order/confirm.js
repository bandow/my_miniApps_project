// pages/order/confirm.js
var baseRQ = require('../../utils/models/BaseRQ.js');
var orderService = require('../../utils/service/orderService.js');
var hotelService = require('../../utils/service/hotelService.js');
var memberService = require('../../utils/service/memberService.js');
var util = require('../../utils/util.js');
var roomNum = 1;
var couponCode = null;
var page = null;
var _options = null;
var _caculateResponse = null;
var _user = null;
var _hotel = null;
var _onloaded = false;
var _onshow = false;
var _memberName = null;
var _mobile = null;
var _papersNo = null;
var _selectedCoupon = null;
var _couponName = null;
var _hasBreakfast = false;
var _useableCoupon = false;
var _tempStartDate = null;
var _dayNum = null;
var _minDate = null;
var _maxDate = null;
var _coupon = null;
Page({
  data: {
    roomNum: roomNum + '间',
    detailList: true,
    //roomNum:'1间',
    //dayNum:'2',
    maskContainer: true,
    maskRoomContainer: true,
    maskDayContainer: true,
    maskPrompt: true,
    maskPromptTitle: '',
    maskPromptContent: '',
    papersNo: '',
  },

  roomSelect: function () {
    this.setData({
      maskContainer: false,
      maskRoomContainer: false,
    })
  },
  maskTap: function () {
    this.setData({
      maskContainer: true,
      maskRoomContainer: true,
      maskDayContainer: true,
      detailList: true,
      maskPrompt: true,
    })
  },
  selectRoomNum: function (e) {
    var num = e.currentTarget.dataset.num;
    roomNum = orderService.setOrderOptions("roomNum",num);
    this.setData({
      maskContainer: true,
      maskRoomContainer: true,
      roomNum: num + '间'
    });
    renderOrder();
  },

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
    orderService.setOrderOptions("startDate",_tempStartDate);
    orderService.setOrderOptions("endDate",util.getStringDate(util.addDate(new Date(_tempStartDate), parseInt(day))));
    // _options.StartDate = _tempStartDate;
    // _options.EndDate = util.getStringDate(util.addDate(new Date(_options.StartDate), parseInt(day)));
    renderOrder();
  },

  //footer
  hotelConfirmTap: function () {
    wx.navigateTo({
      url: '../order/confirm'
    })
  },
  hotelOrderTap: function () {
    wx.navigateTo({
      url: '../order/list'
    })
  },
  hotelMemberTap: function () {
    wx.navigateTo({
      url: '../member/member'
    })
  },

  priceLtap: function (e) {
    this.setData({
      maskContainer: false,
      detailList: false,
    })
  },
  priceRtap: function () {
    this.setData({
      maskContainer: false,
      maskPrompt: false,
      maskPromptTitle: '预订须知',
      maskPromptContent: '1.房间保留到20:00，如未能及时到店，提前联系酒店前台；\n2.电子优惠券使用后，如取消订单或预订未到，电子优惠券不予返还；\n3.酒店通常14:00办理入住，早到可能需要等待。如需在0:00-6:00入住，入住日期请选择前一天。例：12月18日3:00入住，应选择入住日期为12月17日；\n4.银卡，金卡，黑金卡会员本人入住含早，普卡会员和非会员本人入住不享受免费赠送早餐；'
    })
  },
  codeImgTap: function (e) {
    this.setData({
      maskContainer: false,
      maskPrompt: false,
      maskPromptTitle: '提示',
      maskPromptContent: '首次下单需要完善本人身份证信息，身份证号需与入住人所持身份证上的号码保持一致，否则影响前台办理入住。',
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "填写订单"
    });
    _couponName = null;
    _onloaded = false;
    _onshow = false;
    _selectedCoupon = orderService.setOrderOptions("selectedCoupon",null);
    _hasBreakfast = false;
    _tempStartDate = null;
    roomNum = orderService.setOrderOptions("roomNum",1);
    _dayNum = null;
    _minDate = util.getStringDate(new Date());
    _maxDate = util.getStringDate(util.addDate(new Date(), 60));
    // wx.removeStorageSync('selectedCoupon');
    // wx.removeStorageSync('resvervation_options');
    util.showLoading();
    page = this;

    // if (options.request != null) {
    //   _options = JSON.parse(options.request);
    // }
    // else {
    //   _options = options;
    // }

    
    // init();  
    // init2();  
  },

  lookDetail: function (e) {
    this.setData({
      detailList: true
    })
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // _selectedCoupon = wx.getStorageSync('selectedCoupon', _selectedCoupon);
    _selectedCoupon = orderService.getOrderOptions("selectedCoupon");
    // var _resvervation_options = wx.getStorageSync('resvervation_options');
    // if (!util.isNullOrEmpty(_resvervation_options)) {
    //   _options = wx.getStorageSync('resvervation_options');
    // }
    console.log(_selectedCoupon);
    _user = memberService.getCurrentUser({
      url: '../order/confirm',
      // options: _options
    });

    page.setData({
      papersNo: util.isNullOrEmpty(_user.PapersNO),
      minDate: _minDate,
      maxDate: _maxDate
    })

    // //如果判断用户为空则要求用户登录,同时后续不做处理
    if (util.isNullOrEmpty(_user)) {
      return;
    }
    if (_onloaded) {
      renderOrder();
    }
    else {
      _user = memberService.getCurrentUser({
        url: '../order/confirm',
        // options: _options
      });
      init();
      init2();
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    _selectedCoupon = orderService.setOrderOptions("selectedCoupon",null);
  },
  roomNumSubtract: function () {
    roomNum = roomNum - 1;
    if (roomNum <= 1)
      roomNum = 1;
    page.setData({
      roomNum: roomNum
    });
    renderOrder();
  },
  roomNumAdd: function () {
    roomNum = roomNum + 1;
    if (roomNum >= 3)
      roomNum = 3;
    page.setData({
      roomNum: roomNum
    });
    renderOrder();
  },
  orderSubmit: function () {
    //需要验证填写证件号号
    if (util.isNullOrEmpty(_user.PapersNO)) {
      if (util.isNullOrEmpty(_papersNo) || !checkPapersNoBeforeSubmit(_papersNo)) {
        util.showError("提示", "请输入正确的身份证号");
        return;
      } else {
        //完善证件
        var param = baseRQ.getInstance().create();
        param = _user;
        param.PapersNO = _papersNo;
        param.PapersType = 3;
        memberService.Update(param, function (res) {
          //更新会员信息
          _user.PapersNO = _papersNo;
          _user.PapersType = 3;
          memberService.setCurrentUser(_user);
          //下订单
          submitOrder();
        })
      }
    } else {
      submitOrder();
    }
  },
  changeRoomType: function (e) {
    // var request = new Object();
    // // request.HotelId = _options.HotelId;
    // // request.RoomTypeId = _options.RoomTypeId;
    // // request.StartDate = _options.StartDate;
    // // request.EndDate = _options.EndDate;
    // // request.MemberTypeId = _user.MemberTypeID;
    // // request.BookType = _options.BookType;
    // request.HotelId = orderService.getOrderOptions('hotelId');
    // request.RoomTypeId = orderService.getOrderOptions('roomTypeId');
    // request.StartDate = orderService.getOrderOptions('startDate');
    // request.EndDate = orderService.getOrderOptions('endDate');
    // request.MemberTypeId = _user.MemberTypeID;
    // request.BookType = orderService.getOrderOptions('bookType');
    // request.RoomNum = roomNum;
    // //request.CouponCode = couponCode == null ? null : [couponCode];
    // request.TotalFee = _caculateResponse.TotalFee;
    // request.MemberNo = _user.MemberNo;
    // request.GuestName = _memberName;
    // request.Tel = _mobile;
    // request.FeeType = _caculateResponse.FeeType;
    // var json = JSON.stringify(request);.
    _selectedCoupon = orderService.setOrderOptions("selectedCoupon",null);
    _couponName = null;
    util.showLoading();
    setTimeout(function () {
      _onloaded = false;
      wx.removeStorageSync('selectedCoupon');
      // wx.navigateTo({
      //   url: '../hotel/item?request=' + json,
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
      });
    }, 500);
  },
  mobileChange: function (e) {
    _mobile = e.detail.value;
  },
  guestNameChange: function (e) {
    _memberName = e.detail.value;
  },
  guestPapersNoChange: function (e) {
    _papersNo = e.detail.value;
  },
  selectCoupon: function () {
    var request = new Object();
    // request.HotelId = _options.HotelId;
    // request.RoomTypeId = _options.RoomTypeId;
    // request.StartDate = _options.StartDate;
    // request.EndDate = _options.EndDate;
    // request.MemberTypeId = _user.MemberTypeID;
    // request.BookType = _options.BookType;
    // request.RoomNum = roomNum;
    //request.CouponCode = couponCode == null ? null : [couponCode];
    orderService.setOrderOptions("roomNum",roomNum);
    orderService.setOrderOptions("feeType",_caculateResponse.FeeType);
    orderService.setOrderOptions("memberNo",_user.MemberNo);
    orderService.setOrderOptions("totalFee",_caculateResponse.TotalFee);
    // request.TotalFee = _caculateResponse.TotalFee;
    // request.MemberNo = _user.MemberNo;
    // request.GuestName = _memberName;
    // request.Tel = _mobile;
    // request.FeeType = _caculateResponse.FeeType;
    // var json = JSON.stringify(request);
    // wx.navigateTo({
    //   url: 'orderCoupon?request=' + json,
    // })
    wx.navigateTo({
      url: 'orderCoupon',
    })
  }
})

function init() {
  // if (util.isNullOrEmpty(_options.BookType))
  //   _options.BookType = 'NS';
  // if (util.isNullOrEmpty(_options.StartDate)) {
  //   _options.StartDate = util.getStringDate(new Date());
  // }
  // if (util.isNullOrEmpty(_options.EndDate)) {
  //   _options.EndDate = util.getStringDate(util.addDate(new Date(), 1));
  // }
   var bookType = orderService.getOrderOptions("bookType");
  if(util.isNullOrEmpty(bookType))
    {
       sDate =  orderService.setOrderOptions("bookType","NS");
    }

  var sDate = orderService.getOrderOptions("startDate");
  if(util.isNullOrEmpty(sDate))
    {
       sDate =  orderService.setOrderOptions("startDate",util.getStringDate(new Date()));
    }

  var eDate =  orderService.getOrderOptions("endDate");
  if(util.isNullOrEmpty(sDate))
    {
       sDate =  orderService.setOrderOptions("endDate",util.getStringDate(util.addDate(new Date(), 1)));
    }

}

function init2() {
  if (_user.MemberTypeID != '01') {
    _hasBreakfast = true;
  }
  page.setData({
    onloaded: _onloaded,
    hasBreakfast: _hasBreakfast
  });

  var hotelRQ = baseRQ.getInstance().create();
  //hotelRQ.HotelId = _options.HotelId;
  hotelRQ.HotelId = orderService.getOrderOptions("hotelId");
  hotelRQ.NeedRoomType = true;
  //hotelRQ.NeedRoomTypeDisplay = true;
  //hotelRQ.NeedTag = true;
  //hotelRQ.NeedDistance = true;
  //hotelRQ.NeedDetail = true;
  hotelRQ.MemberNO = _user != null ? _user.MemberNo : null;
   hotelRQ.MemberType = _user.MemberTypeID;
  // hotelRQ.StartDate = _options.StartDate;
  // hotelRQ.EndDate = _options.EndDate;
  hotelRQ.StartDate = orderService.getOrderOptions("startDate");
  hotelRQ.EndDate = orderService.getOrderOptions("endDate");
  hotelRQ.RoomPriceType = 'NS';
  hotelService.HotelQuery(hotelRQ, function (hotelResponse) {
    _hotel = hotelResponse.Hotels[0];
    if (_hotel == null)
      return;
    initCaculate();
    renderOrder();
  });
}

function initCaculate() {
  var roomTypeId =  orderService.getOrderOptions("roomTypeId");
  if (util.isNullOrEmpty(roomTypeId)) {
    for (var i = 0; i < _hotel.HotelRoomTypes.length; i++) {
      var hotelRoomType = _hotel.HotelRoomTypes[i];
      for (var j = 0; j < hotelRoomType.HotelRoomStates.length; j++) {
        var hotelRoomState = hotelRoomType.HotelRoomStates[j];
        if (hotelRoomState.UsableCount > 0 && util.isNullOrEmpty(hotelRoomState.ActivityCode) && hotelRoomState.BookType == "NS") {
          // _options.RoomTypeId = hotelRoomType.RoomTypeId;
          // _options.RoomTypeName = hotelRoomType.RoomTypeName;
          orderService.getOrderOptions("roomTypeId",hotelRoomType.RoomTypeId);
          orderService.getOrderOptions("roomTypeName",hotelRoomType.RoomTypeName);
          return;
        }
      }
    }
  }

}

function renderOrder() {
  util.showLoading();
  // 页面初始化 options为页面跳转所带来的参数
  var request = baseRQ.getInstance().create();
  // request.MemberTypeId = _user.MemberTypeID;
  // request.HotelId = _options.HotelId;
  // request.RoomTypeId = _options.RoomTypeId;
  // request.StartDate = _options.StartDate;
  // request.EndDate = _options.EndDate;
  // request.BookType = _options.BookType;
  // request.RoomNum = roomNum;
   request.MemberTypeId = orderService.setOrderOptions("memberTypeId", _user.MemberTypeID);
   request.HotelId = orderService.getOrderOptions("hotelId");
   request.RoomTypeId = orderService.getOrderOptions("roomTypeId");
   request.StartDate = orderService.getOrderOptions("startDate");
   request.EndDate = orderService.getOrderOptions("endDate");
   request.BookType = orderService.getOrderOptions("bookType");
   request.RoomNum = orderService.getOrderOptions("roomNum");
  if (!util.isNullOrEmpty(_selectedCoupon)) {
   request.CouponCode = [_selectedCoupon.CouponCode];
    _couponName = _selectedCoupon.Name;
  }
  orderService.orderCaculate(request, function (caculateResponse) {
    _caculateResponse = caculateResponse;
    for (var i = 0; i < _caculateResponse.DayPrices.length; i++) {
      var dayPrice = _caculateResponse.DayPrices[i];
      dayPrice.BizDay = util.formatDayTime(dayPrice.BizDay);

      // var time = dayPrice.BizDay;
      // var array = [];
      // time = time.replace(/-/g, ':').replace(' ', ':');
      // time = time.split(':');
      // var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
      // array.push(time[0]);
      // array.push(time[1]);
      // array.push(time[2]);
      // var str = array.join("-");
      // dayPrice.BizDay = str;
    }
    _onloaded = true;
    _onshow = true;
    _memberName = _user.MemberName;
    _mobile = _user.Telephone;
    _dayNum = util.dateDiff(new Date(orderService.getOrderOptions("startDate")), new Date(orderService.getOrderOptions("endDate")));
    var startDateDesc = util.dateFormat(new Date(orderService.getOrderOptions("startDate")), 'MM月dd日');
    page.setData({
      hotelName: _hotel.Name,
      roomTypeName: orderService.getOrderOptions("roomTypeName"),
      startDate: orderService.getOrderOptions("startDate"),
      endDate: orderService.getOrderOptions("endDate"),
      numDay: util.dateDiff(new Date(orderService.getOrderOptions("startDate")), new Date(orderService.getOrderOptions("endDate"))),
      userName: _memberName,
      mobile: _mobile,
      dayPrices: _caculateResponse.DayPrices,
      totalFee: _caculateResponse.TotalFee - _caculateResponse.CouponFee,
      onloaded: _onloaded,
      onshow: _onshow,
      couponName: _couponName == null ? "" : _couponName,
      usableCoupon: _caculateResponse.IsUseCoupon,
      dayNum: _dayNum,
      startDateDesc: startDateDesc,
      couponFee: _caculateResponse.CouponFee
    });
    console.log(_caculateResponse.DayPrices);
    util.hideLoading();
  }, null, function () {
  });
}

//证件验证
function checkPapersNoBeforeSubmit(papersNo) {
  if (!util.CheckPaperNo(papersNo)) {
    return false;
  }
  return true;
}

function checkBeforeSubmit() {
  var MemberName = _memberName;
  var Tel = _mobile;
  if (MemberName.length == 0) {
    util.showError("提示", "入住人不能为空");
    return false;
  }
  if (Tel.length == 0 || !util.checkPhone(Tel)) {
    util.showError("提示", "手机号码输入不正确");
    return false;
  }
  return true;
}

function submitOrder() {
  //验证表单合法性
  if (!checkBeforeSubmit()) {
    return;
  }
  var request = baseRQ.getInstance().create();
  request.HotelId = orderService.getOrderOptions("hotelId");
  request.RoomTypeId = orderService.getOrderOptions("roomTypeId");
  request.StartDate = orderService.getOrderOptions("startDate");
  request.EndDate = orderService.getOrderOptions("endDate");
  request.MemberTypeId = _user.MemberTypeID;
  request.BookType = orderService.getOrderOptions("bookType");
  request.RoomNum = orderService.getOrderOptions("roomNum");
  //request.CouponCode = couponCode == null ? null : [couponCode];
  request.TotalFee = _caculateResponse.TotalFee;
  request.MemberNo = _user.MemberNo;
  request.ActivityCode = _user.ActivityCode;
  request.GuestName = _memberName;
  request.Tel = _mobile;
  if (!util.isNullOrEmpty(_selectedCoupon)) {
    request.CouponCode = [_selectedCoupon.CouponCode];
  }

  util.showLoading();
  orderService.orderSubmit(request, function (res) {
    orderService.setOrderOptions('selectedCoupon',null);
    wx.redirectTo({
      url: 'success?orderId=' + res.OrderId,
      success: function () {
        // complete
        util.hideLoading();
      }
    })
  });
}