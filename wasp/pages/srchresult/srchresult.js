/**
 *  zhoujianheng @ Shanghai Hanyun Info Tech Corp.
 */
// pages/srchresult/srchresult.js

var util = require('../../utils/util.js')
var hycomm = require('../../utils/hycomm.js')
var httpreq = require('../../utils/httpreq.js')
var FIRST_PAGE = 1

var app = getApp()

var testdata = {
  "data": [
    {"nickname": "\u5c0f\u679c\u54e5\u54e5", "headimgurl": "http://www.ibee360.com/public/uploads/20170105/586de80355479.jpg", "fans": 1870000, "id": 110, "click_count": 52127, "account": "xiaoguogege123"},
    {"nickname": "\u7528\u6b66\u4e4b\u5730", "headimgurl": "http://www.ibee360.com/public/uploads/20170105/586de8035e01c.jpg", "fans": 750000, "id": 148, "click_count": 45947, "account": "y5zd123"}, 
    {"nickname": "\u5168\u7403\u6700\u70ed\u95e8\u8bdd\u9898", "headimgurl": "http://www.ibee360.com/public/uploads/20170105/586de7f8be8d3.jpg", "fans": 198850, "id": 282, "click_count": 50001, "account": "wj1239329449"},
    ],
    "total": 11,
    "last_page": 1,
    "next_page_url": null,
    "to": 11,
    "current_page": 1,
    "prev_page_url": null,
    "from": 1,
    "per_page": 15
};

Page({
  /**
   * 页面的初始数据
   */
  data:{
  	page: FIRST_PAGE,
  	size: 20,
    total: 0,
    persons: [],
    hasMore: false,
    loading: false,
    reqfail: false,
  },
  handleLoadMore: function handleLoadMore(){
    var keyword = "", _this = this, title = "", errtip="搜索后网络或服务器返回异常";
    
    if(!this.data.hasMore) return;

    this.setData({loading: true, reqfail: false});

    app.data.keyword && (keyword = app.data.keyword);

    //bar title上设置加载动画
    wx.showNavigationBarLoading();
    if(this.data.page == FIRST_PAGE){
      wx.setNavigationBarTitle({
        title : "正在搜索，请稍后~"
      });
    }

    httpreq(hycomm.urlReqSrch,'GET',{
      data:{
        'api-key' : hycomm.apikey,
        'keyword' : keyword,
        'per_page' : this.data.size,
        'page' : this.data.page,
      }
    }).then(function(d){
      if(d && d.data && d.data.data){
        var dddata = d.data.data;
        if(_this.data.page == FIRST_PAGE /* || d.total != _this.data.total */){
          _this.setData({total : d.data.total});
          wx.setNavigationBarTitle({title: "共" + d.data.total + "条资源"});
        }
        if(dddata.length && dddata.length >= _this.data.size)
          _this.setData({loading:false,hasMore:true,persons:_this.data.persons.concat(dddata)});
        else
          _this.setData({loading:false,hasMore:false,persons:_this.data.persons.concat(dddata)});
        _this.data.page += 1;
      }else{
        if(_this.data.page == FIRST_PAGE){
          wx.setNavigationBarTitle({title: "共0条资源"});
        }
        _this.setData({reqfail:true, loading:false});
        /*wx.showToast({
          title: '加载数据失败',
          duration: 2000
        });*/
      }
      wx.hideNavigationBarLoading();
    }).catch(function(e){
      if(_this.data.page == FIRST_PAGE){
        wx.setNavigationBarTitle({title : "共0条资源"});
      }else{
        /*wx.showToast({
          title: '加载数据失败',
          duration: 2000
        });*/
      }
      _this.setData({reqfail:true,loading: false});
      wx.hideNavigationBarLoading();
    });

  },
  handleSrch:function handleSrch(){
    this.handleLoadMore();
    //this.setData({ persons : testdata.data});
  },
  onLoad:function(options){
    wx.showShareMenu();
    //页面初始化 options为页面跳转所带来的参数
    this.setData({hasMore: true});
    this.handleSrch();
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