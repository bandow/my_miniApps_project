// pages/member/coupon.js
var baseRQ = require('../../utils/models/BaseRQ.js');
var memberService = require('../../utils/service/memberService.js');
var commonService = require('../../utils/service/commonService.js');
var util = require('../../utils/util.js');
var User = null;
var page = null;
//分页参数
var pageIndex = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
var Total = 0;

var GetList = function () {
  var CouponType = [];
  page.setData({
    hidden: false
  });
  var request = baseRQ.getInstance().create();
  request.MemberNo = User.MemberNo;
  CouponType.push('COUPON')
  request.CouponType = CouponType;
  request.NeedDetail = true;
  //分页参数
  request.Pagination = true;
  request.Page = pageIndex;
  request.Rows = page_size;
  memberService.MemberCouponQuery(request, function (res) {
    if (((pageIndex + 1) * page_size) > res.Total) {
      console.log("到底啦");
    } else {
      util.showLoading();
      var coupons = page.data.Coupons;
      var couponsList = resetCoupon(res.CouponList);
      for (var i = 0; i < couponsList.length; i++) {
        coupons.push(couponsList[i]);
      }
      pageIndex++;
      util.hideLoading();
      console.log(request);
      page.setData({
        Coupons: coupons,
        member: User
      })
    }
  });
}


// wx.request({
//     url:url,
//     data:{
//         page : page,
//         page_size : page_size,
//         sort : sort,
//         is_easy : is_easy,
//         lange_id : lange_id,
//         pos_id : pos_id,
//         unlearn : unlearn
//     },
//     success:function(res){
//         //console.info(that.data.list);
//         var list = that.data.list;
//         for(var i = 0; i < res.data.list.length; i++){
//             list.push(res.data.list[i]);
//         }
//         that.setData({
//             list : list
//         });
//         page ++;
//         that.setData({
//             hidden:true
//         });
//     }
// });


Page({
  data: {
    Coupons: [],
    member: [],
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0,
  },
  onLoad: function (options) {
    var that = this;
    page = that;
    wx.setNavigationBarTitle({
      title: '我的优惠券',
    })
    User = memberService.getCurrentUser();
    if (util.isNullOrEmpty(User)) {
      //跳转至登录
      wx.redirectTo({
        url: '../member/login'
      });
    } else {
      wx.getSystemInfo({
        success: function (res) {
          console.info(res.windowHeight);
          that.setData({
            scrollHeight: res.windowHeight
          });
        }
      });
      GetList(options);
      //优惠券列表(分页)
      // util.showLoading();
      // var request = baseRQ.getInstance().create();
      // request.MemberNo = User.MemberNo;
      // CouponType.push(options.CouponType)
      // request.CouponType = CouponType;
      // request.NeedDetail = true;
      // memberService.MemberCouponQuery(request, function (res) {
      //   wx.getSystemInfo({
      //     success: function (e) {
      //       // success
      //       //console.info(e.windowHeight);
      //       that.setData({
      //         scrollHeight: e.windowHeight,
      //         Coupons: resetCoupon(res),
      //         member: User
      //       });
      //     }
      //   })
      //   util.hideLoading();
      // })
    }//else分页结束
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    //GetList(options);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //下拉触发
  bindDownLoad: function () {
    GetList();
  },
  scroll: function (event) {
    page.setData({
      //scrollTop: event.detail.scrollTop
      scrollTop: event.detail.scrollHeight
    });
  },
  refresh: function (event) {
    // pageIndex=0;
    // page.setData({
    //   //list: [],
    //   scrollTop: 0
    // });
    // GetList();

    pageIndex = 0;
    page.setData({
      //list : [],
      scrollTop: 0
    });
    GetList();
  }

})

function resetCoupon(Coupons) {
  if (Coupons.length > 0) {
    for (var i = 0; i < Coupons.length; i++) {
      Coupons[i]['EndTime'] = Coupons[i]['EndTime'].replace('00:00:00', '');
      Coupons[i]['EnableHotels'] = Coupons[i]['EnableHotels'].length <= 1 ? "适用全部酒店" : "适用" + Coupons[i]['EnableHotels'].length + "门店"
    }
  }
  return Coupons;
};
