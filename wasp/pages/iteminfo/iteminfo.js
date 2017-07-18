/**
 *  zhoujianheng @ Shanghai Hanyun Info Tech Corp.
 */
// pages/iteminfo/iteminfo.js
var util = require('../../utils/util.js')
var hycomm = require('../../utils/hycomm.js')
var httpreq = require('../../utils/httpreq.js')

Page({
  data:{
    id:0,
    item: null ,
    hard_paper_price:null ,
    first_hard_paper_price:null ,
    second_hard_paper_price:null ,
    large_hard_paper_price:null ,
    soft_paper_price:null ,
    first_soft_paper_price:null,
    second_soft_paper_price:null,
    large_soft_paper_price:null,
    loading: false,
    reqfail: false,
  },
  setupCall : function(e){
    wx.makePhoneCall({
      phoneNumber: hycomm.phone_number,
      success: function(res) {
        // do nothing.
      }
    });
  },
  getIteminfo: function getIteminfo(){
    var _this = this, errtip="获取数据失败";

    //bar title上设置加载动画
    wx.showNavigationBarLoading();
    this.setData({loading:true, reqfail:false});

    httpreq(hycomm.urlGetIteminfo,'GET',{
      data:{
        'api-key' : hycomm.apikey,
        'id' : this.data.id,
      }
    }).then(function(d){
      if(d && d.data){
        var ddata = d.data;

        if(typeof ddata.hard_paper_price != 'string')
            _this.data.hard_paper_price = ddata.hard_paper_price;
        if(typeof ddata.first_hard_paper_price != 'string')
            _this.data.first_hard_paper_price = ddata.first_hard_paper_price;
        if(typeof ddata.second_hard_paper_price != 'string')
            _this.data.second_hard_paper_price = ddata.second_hard_paper_price;
        if(typeof ddata.large_hard_paper_price != 'string')
            _this.data.large_hard_paper_price = ddata.large_hard_paper_price;
        if(typeof ddata.soft_paper_price != 'string')
            _this.data.soft_paper_price = ddata.soft_paper_price;
        if(typeof ddata.first_soft_paper_price != 'string')
            _this.data.first_soft_paper_price = ddata.first_soft_paper_price;
        if(typeof ddata.second_oft_paper_price != 'string')
            _this.data.second_oft_paper_price = ddata.second_oft_paper_price;
        if(typeof ddata.large_soft_paper_price != 'string')
            _this.data.large_soft_paper_price = ddata.large_soft_paper_price;

        _this.setData({
          item : ddata,
          hard_paper_price:_this.data.hard_paper_price,
          first_hard_paper_price:_this.data.first_hard_paper_price,
          second_hard_paper_price:_this.data.second_hard_paper_price,
          large_hard_paper_price:_this.data.large_hard_paper_price,
          soft_paper_price:_this.data.soft_paper_price,
          first_soft_paper_price:_this.data.first_soft_paper_price,
          second_soft_paper_price:_this.data.second_soft_paper_price,
          large_soft_paper_price:_this.data.large_soft_paper_price,
          loading: false,
        });

      }else{
        /*wx.showToast({
          title: errtip,
          duration: 2000
        });*/
        _this.setData({loading:false, reqfail:true});
      }
      wx.hideNavigationBarLoading();
    }).catch(function(e){
      /*wx.showToast({
        title: errtip,
        duration: 2000
      });*/
      _this.setData({loading:false, reqfail:true});
      wx.hideNavigationBarLoading();
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;

    wx.showShareMenu();
    wx.setNavigationBarTitle({ title : "查看价格"});
    this.data.id = options.id;
    this.getIteminfo();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})