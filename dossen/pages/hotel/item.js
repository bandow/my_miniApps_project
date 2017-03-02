var baseRQ = require('../../utils/models/BaseRQ.js');
var hotelService = require('../../utils/service/hotelService.js');
var memberService = require('../../utils/service/memberService.js');
var orderService = require('../../utils/service/orderService.js');
var configs = require('../../utils/configs.js');
var util = require('../../utils/util.js');
var _options = null;
var _page = null;
var _hotel = null;
var _startDate = null;
var _endDate = null;
var _user = null;
var _numDay = 0;
var _memberType = null;
var _hasWifi = false;
var _hasBreakfast = false;
var _hasParkingLot = false;
var _onloaded = false;
var _minDate = null;
var _maxDate = null;
var _tempStartDate = null;
var _blockconfirm = null;

Page({
 data: {
    //statusList = list,
   //轮播图
    imgUrls: [
      '/images/d1.jpg',
      '/images/d1.jpg',
      '/images/d1.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    dayNum:'2',
    maskContainer:true,
    maskDayContainer:true,

    //房型列表
    //roomTypes: list,

    //点击房型列表
    //星星
    flag:5,
   },
  //点击房型列表
  roomListTap:function(event){
    setStatus(event.currentTarget.dataset.index);
  },

//点击日历
bindDateChange: function(e) {
  _tempStartDate = e.detail.value
    this.setData({
      date: e.detail.value,
      //startDate:'',
      maskContainer:false,
      maskDayContainer:false,
    })
  },
//点击几晚
   selectDayNum:function(e){
      _numDay = e.currentTarget.dataset.day;
      this.setData({
      maskContainer:true,
      maskDayContainer:true,
    })
    orderService.setOrderOptions("startDate",_tempStartDate);
    orderService.setOrderOptions("endDate",util.addDate(new Date(_tempStartDate),_numDay));
    
    _startDate = orderService.getOrderOptions("startDate");
    _endDate = orderService.getOrderOptions("endDate");
    setDate();
    render();
 },


  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    _page = this;

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    _user = memberService.getCurrentUser();
    _memberType = _user==null?"01":_user.MemberTypeID;
    util.showLoading();
    _blockconfirm = false;
    var hotelId = orderService.getOrderOptions("hotelId");
    if(util.isNullOrEmpty(hotelId))
    {
       orderService.setOrderOptions("hotelId","0020001");
    }
    // 页面显示
    _startDate = orderService.getOrderOptions("startDate");
    _endDate = orderService.getOrderOptions("endDate");
    if(util.isNullOrEmpty(_startDate))
    {
       _startDate = orderService.setOrderOptions("startDate",util.dateFormat(new Date(),"yyyy-MM-dd"));
    }
    if(util.isNullOrEmpty(_endDate))
    {
       _endDate = orderService.setOrderOptions("endDate",util.dateFormat(util.addDate(new Date(),1),'yyyy-MM-dd'));
    }
    _minDate = util.getStringDate(new Date());
    _maxDate = util.getStringDate(util.addDate(new Date(),60));
    _tempStartDate = null;
    _page.setData({
      minDate:_minDate,
      maxDate:_maxDate
    });
    setDate();
    render();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
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
          phoneNumber: _hotel.Telephone,
        })
        }
      }
    });
  },
  orderConfirm:function(event){
    if(_blockconfirm)
      return;
    _blockconfirm = true;
    util.showLoading();
     var currentTarget = event.currentTarget;
     var roomTypeId = currentTarget.dataset.roomtypeid;
     var memberTypeId = _memberType;
     var bookType = currentTarget.dataset.booktype;
     var startDate = _startDate;
     var endDate = _endDate;
     var activityCode = currentTarget.dataset.activitycode;
     var roomTypeName = currentTarget.dataset.roomtypename;
    orderService.setOrderOptions("hotelId",_hotel.HotelId);
    orderService.setOrderOptions("memberTypeId",memberTypeId);
    orderService.setOrderOptions("bookType",bookType);
    orderService.setOrderOptions("activityCode",activityCode);
    orderService.setOrderOptions("roomTypeName",roomTypeName);
    orderService.setOrderOptions("roomTypeId",roomTypeId);
    // orderService.setOrderOptions("hotelId",_hotel.HotelId);
    // orderService.setOrderOptions("hotelId",_hotel.HotelId);
    var url =  '../order/confirm';
    //wx.setStorageSync('resvervation_options',request)
     setTimeout(function(){
      wx.navigateTo({
       url: url,
       success: function(res){
         // success
         util.hideLoading();
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
         _blockconfirm = false;
       }
     })
    // wx.navigateBack({
    //   delta: 1, // 回退前 delta(默认为1) 页面
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
      },500);
     
  }
})

function setDate()
{
    _numDay = util.dateDiff(new Date(_startDate),new Date(_endDate));
    var startDateDesc = _startDate==util.getStringDate(new Date())?"今天":getDayOfWeek(new Date(_startDate).getDay());
    var endDateDesc = _endDate==util.getStringDate(new Date())?"今天":getDayOfWeek(new Date(_endDate).getDay());
    _page.setData({
      startDate:util.dateFormat(new Date(_startDate),'MM月dd日'),
      endDate:util.dateFormat(new Date(_endDate),'MM月dd日'),
      startDateDesc:startDateDesc,
      endDateDesc:endDateDesc,
      file_url:configs.getInstance().file_url,
      numDay:_numDay
    });
}

function getDayOfWeek(num)
{
   switch(num)
   {
     case 0:
        return "周日";
     case 1:
        return "周一";
     case 2:
        return "周二";
     case 3:
        return "周三";
     case 4:
        return "周四";
     case 5:
        return "周五";
     case 6:
        return "周六";
      
   }
}

function setStatus(index)
{
  var hotelRoomTypes = _hotel.HotelRoomTypes;
  var status = hotelRoomTypes[index].display;
  if(status==null)
     status = false;
   for(var i = 0; i<hotelRoomTypes.length;i++)
   {
      hotelRoomTypes[i].display = false;
   }
   hotelRoomTypes[index].display = !status;
    _page.setData({hotel:_hotel});
}

function render()
{
    var hotelRQ = baseRQ.getInstance().create();
    //hotelRQ.HotelId = _options.HotelId;
    hotelRQ.HotelId = orderService.getOrderOptions('hotelId');
    hotelRQ.NeedRoomType = true;
    hotelRQ.NeedRoomTypeDisplay = true;
    hotelRQ.NeedTag = true;
    hotelRQ.NeedDistance = true;
    hotelRQ.NeedDetail = true;
    hotelRQ.MemberNO = _user!=null?_user.MemberNo:null;
    hotelRQ.MemberType =  _user!=null?_user.MemberTypeID:'01';
    hotelRQ.StartDate = _startDate;
    hotelRQ.EndDate = _endDate;
    hotelRQ.RoomPriceType = 'NS';
    hotelService.HotelQuery(hotelRQ, function (hotelResponse) {
      _hotel = hotelResponse.Hotels[0];
      if (_hotel == null)
        return;
      wx.setNavigationBarTitle({
        title: _hotel.Name,
      });
      initHotelFacilities();
      initHotelRoomType();
      _onloaded = true;
      _page.setData({hotel:_hotel,hasWifi:_hasWifi,hasBreakfast:_hasBreakfast,hasParkingLot:_hasParkingLot,onloaded:_onloaded});
      util.hideLoading();
    });
}

function initHotelFacilities()
{
   for(var i=0;i<_hotel.HotelFacilities.length;i++)
   {
     var hotelFacility = _hotel.HotelFacilities[i];
      if(hotelFacility.Name == "免费WIFI")
         _hasWifi = true;
      if(hotelFacility.Name == "停车场")
         _hasParkingLot = true;
      if(hotelFacility.Name == "自助营养早餐厅")
         _hasBreakfast = true;
   }
}

function initHotelRoomType()
{
    for(var i=0;i<_hotel.HotelRoomTypes.length;i++)
    {
       var lowestPrice = null;
       var rackFee = null;
       var hotelRoomType = _hotel.HotelRoomTypes[i];

       for(var j = 0;j<hotelRoomType.HotelRoomStates.length;j++)
       {
         var hotelRoomState = hotelRoomType.HotelRoomStates[j];
         if(hotelRoomState.BookType == "POINT")
         {
            // var roomPrice = hotelRoomState.RoomPrices[k];
            // hotelRoomState.RoomFee = roomPrice.RoomFee;
            // hotelRoomState.FeeType = roomPrice.FeeType;
         }
         else
         {
          for(var k = 0;k<hotelRoomState.RoomPrices.length;k++)
          {
             var roomPrice = hotelRoomState.RoomPrices[k];
             if(roomPrice.MemberTypeId==_memberType)
              {
                 hotelRoomState.RoomFee = roomPrice.RoomFee;
                 hotelRoomState.FeeType = roomPrice.FeeType;
                 break;
              }
          }
          }
         if(hotelRoomState.BookType != "NS")
            continue;
         //接入活动房时最低价计算逻辑
        //  if(lowestPrice==null)
        //     lowestPrice = hotelRoomState.LowestPrice;
        //  if(lowestPrice>hotelRoomState.LowestPrice)
        //     lowestPrice = hotelRoomState.LowestPrice;
        // 没接入活动房时的逻辑
        if(lowestPrice==null&&util.isNullOrEmpty(hotelRoomState.ActivityCode))
             lowestPrice = hotelRoomState.RoomPrices[0].RoomFee;
        if(rackFee==null)
            rackFee = hotelRoomState.RackFee;
        
       }
       hotelRoomType.lowestPrice = lowestPrice;
       hotelRoomState.rackFee = rackFee;
    }
}

