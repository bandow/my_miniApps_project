/**
 *  zhoujianheng @ Shanghai Hanyun Info Tech Corp.
 */
var util = require('../../utils/util.js')
var hycomm = require('../../utils/hycomm.js')
var httpreq = require('../../utils/httpreq.js')

var app = getApp()
var allpacks = {
    "tech":[
        {
            "name":"新闻搜索源套餐A",
            "desc":"套餐一",
            "price":"套餐价 4.5万",
            "avatar":"../../images/ic_go_01.png",
            "effect":"知名媒体发稿",
            "apply":"适用:品牌基础搭建",
        },
        {
            "name":"新闻搜索源套餐B",
            "desc":"套餐二",
            "price":"套餐价 5.5万",
            "avatar":"../../images/ic_go_01.png",
            "effect":"权威媒体发稿",
            "apply":"适用:品牌公关发声",
        },
        {
            "name":"科技事件新闻套餐",
            "desc":"套餐三",
            "price":"套餐价 2.28万",
            "avatar":"../../images/ic_go_01.png",
            "effect":"科技媒体发稿",
            "apply":"适用:互联网科技公关传播",
        }
    ],
    "star":[
        {
            "name":"娱乐明星套餐A",
            "desc":"套餐一",
            "price":"套餐价 50万",
            "avatar":"../../images/ic_go_02.png",
            "effect":"影响人数500万+",
            "apply":"适用:创业公司背书",
        },{
            "name":"娱乐明星套餐B",
            "desc":"套餐二",
            "price":"套餐价 80万",
            "avatar":"../../images/ic_go_02.png",
            "effect":"影响人数1500万+",
            "apply":"适用:新品上市",
        },{
            "name":"娱乐明星套餐C",
            "desc":"套餐三",
            "price":"套餐价 160万",
            "avatar":"../../images/ic_go_02.png",
            "effect":"影响人数3000万+",
            "apply":"适用:品牌发声",
        }
    ],
    "zhihu":[
        {
            "name":"知乎大V营销套餐A",
            "desc":"套餐一",
            "price":"套餐价 5万",
            "avatar":"../../images/ic_go_03.png",
            "effect":"小范围制造舆论",
            "apply":"适用:产品评测",
        },
        {
            "name":"知乎大V营销套餐B",
            "desc":"套餐二",
            "price":"套餐价 15万",
            "avatar":"../../images/ic_go_03.png",
            "effect":"公关舆论制造",
            "apply":"适用:品牌公关、弱化负面",
        },
        {
            "name":"知乎大V营销套餐C",
            "desc":"套餐三",
            "price":"套餐价  25万",
            "avatar":"../../images/ic_go_03.png",
            "effect":"内容爆炸",
            "apply":"适用:全网内容营销",
        }
    ],
    "taobao":[
        {
            "name":"淘宝达人套餐A",
            "desc":"套餐一",
            "price":"套餐价 12万",
            "avatar":"../../images/ic_go_04.png",
            "effect":"打造爆款，月销十万件",
            "apply":"适用:新品上市、店铺引流",
        },
        {
            "name":"淘宝达人套餐B",
            "desc":"套餐二",
            "price":"套餐价 20万",
            "avatar":"../../images/ic_go_04.png",
            "effect":"站内大曝光，月过百万不是梦",
            "apply":"适用:店铺促销、提升业绩",
        },
        {
            "name":"淘宝达人套餐C",
            "desc":"套餐三",
            "price":"套餐价 45万",
            "avatar":"../../images/ic_go_04.png",
            "effect":"迈向一线流量店铺，让小二关注你",
            "apply":"适用:瓶颈期的二线店铺",
        }
    ],
    "foreign":[
        {
            "name":"海外超值包",
            "desc":"套餐一",
            "price":"套餐价 2万",
            "avatar":"../../images/ic_go_05.png",
            "effect":"宇宙中心露个脸",
            "apply":"适用:创业品牌融资助推",
        },{
            "name":"海外实惠包",
            "desc":"套餐二",
            "price":"套餐价 6万",
            "avatar":"../../images/ic_go_05.png",
            "effect":"全球性事件必备",
            "apply":"适用:制造事件性营销",
        },{
            "name":"海外聚划算",
            "desc":"套餐三",
            "price":"套餐价 30万",
            "avatar":"../../images/ic_go_05.png",
            "effect":"品牌地位上升一档",
            "apply":"适用:国内二三线品牌",
        },{
            "name":"海外全球包",
            "desc":"套餐四",
            "price":"套餐价 70万",
            "avatar":"../../images/ic_go_05.png",
            "effect":"从中国迈向全球",
            "apply":"适用:准上市企业，新品上市",
        }
    ]
};

Page({
  /**
   * 页面的初始数据
   */
  data:{
    ptype:0,
    packages: [],
    PACKTYPE:{TECH:1,STAR:2,ZHIHU:3,TAOBAO:4,FOREIGN:5},
    loading: false,
    reqfail: false,
  },
  bindPackListTap: function(e){
    var index = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../packitem/packitem?type='+this.data.ptype+'&index='+index
    })
  },
  onLoad:function(options){
    var title = "加载数据失败", currpack = null;

    if(options.type == this.data.PACKTYPE.TECH){
        currpack = allpacks.tech;
    }else if(options.type == this.data.PACKTYPE.STAR){
        currpack = allpacks.star;
    }else if(options.type == this.data.PACKTYPE.ZHIHU){
        currpack = allpacks.zhihu;
    }else if(options.type == this.data.PACKTYPE.TAOBAO){
        currpack = allpacks.taobao;
    }else if(options.type == this.data.PACKTYPE.FOREIGN){
        currpack = allpacks.foreign;
    }
    if(currpack){
        title = "共"+ currpack.length +"条资源",
        this.setData({ptype:options.type,packages:currpack});
    }
    wx.showShareMenu();
    wx.setNavigationBarTitle({
        title : title
    });
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
