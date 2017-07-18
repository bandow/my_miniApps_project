/**
 *  zhoujianheng @ Shanghai Hanyun Info Tech Corp.
 */
var util = require('../../utils/util.js')
var hycomm = require('../../utils/hycomm.js')
var httpreq = require('../../utils/httpreq.js')

var app = getApp()
var allpacks = {
    tech:[
        {
            "name":"新闻搜索源套餐A",
            "desc":"套餐一",
            "price":"套餐价 4.5万",
            "avatar":"../../images/ic_go_01.png",
            "contents":[
                {
                    "name":"四大门户",
                    "desc":"4个知名网站",
                    "effect":"新浪网、腾讯网、网易、搜狐"
                },
                {
                    "name":"央媒网",
                    "desc":"8选5 不作具体指定",
                    "effect":"人民网、新华网、中国新闻网、光明网、中国经济网、央视中国日报网、中国广播网"
                },
                {	
                    "name":"权威门户发布",
                    "desc":"15选8 不作具体指定",
                    "effect":"中国网、中华网、凤凰网、21CN、和讯、中国企业新闻网、中国经营网、中国商报网、聪慧网、国际在线、中国经济新闻网、中青在线、南方企业新闻网、中国产业经济信息网、中国发展网"
                },
                {	
                    "name":"科技网站媒体发布",
                    "desc":"20选10 不作具体指定",
                    "effect":"每日科技、IT168、亿邦动力、泡泡网、太平洋电脑网、小熊在线、赛迪网、飞象网、TECHWEB、中原硅谷网、DONEWS、和讯网IT科技、CSDN、科技讯、中文科技资讯、比特网、IT专家网、硅谷动力、CNET科技资讯网、51CTO"
                }
            ]
        },
        {
            "name":"新闻搜索源套餐B",
            "desc":"套餐二",
            "price":"套餐价 5.5万",
            "avatar":"../../images/ic_go_01.png",
            "contents":[
                {
                    "name":"四大门户",
                    "desc":"4个知名网站",
                    "effect":"新浪网、腾讯网、网易、搜狐"
                },
                {
                    "name":"央媒网",
                    "desc":"8大央媒网站",
                    "effect":"人民网、新华网、中国新闻网、光明网、中国经济网、央视中国日报网、中国广播网"
                },
                {
                    "name":"权威门户发布",
                    "desc":"15选11 不作具体指定",
                    "effect":"中国网、中华网、凤凰网、21CN、和讯、中国企业新闻网、中国经营网、中国商报网、聪慧网、国际在线、中国经济新闻网、中青在线、南方企业新闻网、中国产业经济信息网、中国发展网"
                },
                {
                    "name":"科技网站媒体发布",
                    "desc":"20选10 不作具体指定",
                    "effect":"每日科技、IT168、亿邦动力、泡泡网、太平洋电脑网、小熊在线、赛迪网、飞象网、TECHWEB、中原硅谷网、DONEWS、和讯网IT科技、CSDN、科技讯、中文科技资讯、比特网、IT专家网、硅谷动力、CNET科技资讯网、51CTO"
                },
                {
                    "name":"财经网站媒体发布",
                    "desc":"20选10 不作具体指定",
                    "effect":"金融中国、天下金融网、中金在线、证券之星、金融界网、全景网、东方财富网、商界在线、顶尖财经网、环球财讯网、南方财富网、中国商业新闻网、中国金融网、中国商业报道网、华讯财经、大众财经网、中国企业财经网、中财网、华夏财经网、价值中国网"
                }
            ]
        },
        {
            "name":"科技事件新闻套餐",
            "desc":"套餐三",
            "price":"套餐价 2.28万",
            "avatar":"../../images/ic_go_01.png",
            "contents":[
                {
                    "name":"新浪科技首页",
                    "desc":"知名网站",
                    "effect":"科技新闻内页评论区上方两轮播640*90悬停通栏（天）"
                },
                {
                    "name":"央媒网",
                    "desc":"8选5 不作具体指定",
                    "effect":"人民网、新华网、中国新闻网、光明网、中国经济网、央视中国日报网、中国广播网"
                },
                {
                    "name":"权威门户发布",
                    "desc":"15选11 不作具体指定",
                    "effect":"中国网、中华网、凤凰网、21CN、和讯、中国企业新闻网、中国经营网、中国商报网、聪慧网、国际在线、中国经济新闻网、中青在线、南方企业新闻网、中国产业经济信息网、中国发展网"
                },
                {	
                    "name":"科技网站媒体发布",
                    "desc":"20选10 不作具体指定",
                    "effect":"每日科技、IT168、亿邦动力、泡泡网、太平洋电脑网、小熊在线、赛迪网、飞象网、TECHWEB、中原硅谷网、DONEWS、和讯网IT科技、CSDN、科技讯、中文科技资讯、比特网、IT专家网、硅谷动力、CNET科技资讯网、51CTO"
                }
            ]
        }
    ],
    star:[
        {
            name:"娱乐明星营销套餐A",
            desc:"套餐一",
            price:"套餐价 50万",
            avatar:"../../images/ic_go_02.png",
            contents:[
                {
                    name:"50万元推广计划",
                    desc:"任选一位明星发布微博1条(入镜及其他可谈)",
                    effect:"额外赠送 ：8个新浪微博人气KOL对微博进行转发(粉丝4500W+)\n微博热门话题前十榜一小时",
                    persons:[
                        {
                            name:"沈梦辰",
                            weibofans:"489万",
                            avatar:"../../images/star_shenmengchen.jpg",
                        },{
                            name:"胡彦斌",
                            weibofans:"338万",
                            avatar:"../../images/star_huyanbin.jpg",
                        },{
                            name:"刘维",
                            weibofans:"228万",
                            avatar:"../../images/star_liuwei.jpg",
                        },{
                            name:"胡可",
                            weibofans:"367万",
                            avatar:"../../images/star_huke.jpg",
                        },{
                            name:"沙溢",
                            weibofans:"631万",
                            avatar:"../../images/star_shayi.jpg",
                        }
                    ]
                }
            ]
        },{
            name:"娱乐明星营销套餐B",
            desc:"套餐二",
            price:"套餐价 80万",
            avatar:"../../images/ic_go_02.png",
            contents:[
                {
                    name:"80万元推广计划",
                    desc:"任选一位明星发布微博1条(入镜及其他可谈)",
                    effect:"额外赠送 ：8个新浪微博人气KOL对微博进行转发(粉丝4500W+)\n微博热门话题前十榜一小时",
                    persons:[
                        {
                            name:"林更新",
                            weibofans:"3190万",
                            avatar:"../../images/star_lingengxin.jpg",
                        },{
                            name:"王祖蓝",
                            weibofans:"1899万",
                            avatar:"../../images/star_wangzulan.jpg",
                        },{
                            name:"郑恺",
                            weibofans:"3304万",
                            avatar:"../../images/star_zhengkai.jpg",
                        },{
                            name:"李晨",
                            weibofans:"4669万",
                            avatar:"../../images/star_lichen.jpg",
                        },{
                            name:"盛一伦",
                            weibofans:"536万",
                            avatar:"../../images/star_shengyilun.jpg",
                        },{
                            name:"迪丽热巴",
                            weibofans:"1838万",
                            avatar:"../../images/star_dilireba.jpg",
                        }
                    ]
                }
            ]
        },{
            name:"娱乐明星营销套餐C",
            desc:"套餐三",
            price:"套餐价 160万",
            avatar:"../../images/ic_go_02.png",
            contents:[
                {
                    name:"160万元推广计划",
                    desc:"任选一位明星发布微博1条(入镜可谈)",
                    effect:"额外赠送 ：8个新浪微博人气KOL对微博进行转发(粉丝4500W+)\n微博热门话题前十榜一小时\n互动H5一个(含肖像权使用)\n5个微信KOL,10个网络新闻媒体发布",
                    persons:[
                        {
                            name:"李易峰",
                            weibofans:"3608万",
                            avatar:"../../images/star_liyifeng.jpg",
                        },{
                            name:"赵又廷",
                            weibofans:"1073万",
                            avatar:"../../images/star_zhaoyouting.jpg",
                        },{
                            name:"薛之谦",
                            weibofans:"2820万",
                            avatar:"../../images/star_xuezhiqian.jpg",
                        },{
                            name:"王凯",
                            weibofans:"1333万",
                            avatar:"../../images/star_wangkai.jpg",
                        },{
                            name:"张艺兴",
                            weibofans:"2171万",
                            avatar:"../../images/star_zhangyixing.jpg",
                        },{
                            name:"陈伟霆",
                            weibofans:"2135万",
                            avatar:"../../images/star_chenweiting.jpg",
                        }
                    ]
                }
            ]
        }
    ],
    zhihu:[
        {
            "name":"知乎大V营销套餐A",
            "desc":"套餐一",
            "price":"套餐价 5万",
            "avatar":"../../images/ic_go_03.png",
            "contents":[
                {
                    "name":"知乎大V发帖",
                    "desc":"2个知乎大V",
                    "effect":"预计曝光量110万+，阅读量8万+"
                },
                {
                    "name":"知乎大V点赞",
                    "desc":"8个知乎大V",
                    "effect":"预计曝光量110万+，阅读量8万+"
                },
                {
                    "name":"今日头条",
                    "desc":"5个今日头条KOL",
                    "effect":"预计曝光量20万+，阅读量5万+ "
                }
            ]
        },
        {
            "name":"知乎大V营销套餐B",
            "desc":"套餐二",
            "price":"套餐价 15万",
            "avatar":"../../images/ic_go_03.png",
            "contents":[
                {
                    "name":"知乎大V发帖",
                    "desc":"5个知乎大V",
                    "effect":"预计曝光量130万+，阅读量18万+"
                },
                {
                    "name":"今日头条",
                    "desc":"10个今日头条KOL",
                    "effect":"预计曝光量40万+，阅读量10万+"
                },
                {
                    "name":"微博大号",
                    "desc":"5个人气微博KOL",
                    "effect":"预计曝光量1500万+，阅读量400万+ "
                }
            ]
        },
        {
            "name":"知乎大V营销套餐C",
            "desc":"套餐三",
            "price":"套餐价  25万",
            "avatar":"../../images/ic_go_03.png",
            "contents":[
                {
                    "name":"知乎大V发帖",
                    "desc":"10个知乎大V",
                    "effect":"预计曝光量220万+，阅读量25万+"
                },
                {
                    "name":"知乎大V点赞",
                    "desc":"15个知乎大V",
                    "effect":"预计曝光量220万+，阅读量25万+"
                },
                {
                    "name":"今日头条",
                    "desc":"10个今日头条KOL",
                    "effect":"预计曝光量40万+，阅读量10万+"
                },
                {
                    "name":"微博大号",
                    "desc":"8个微博大号，冲击微博热门话题前10一小时",
                    "effect":"预计曝光量4000万+，阅读量2000万+"
                },
                {
                    "name":"网媒发稿",
                    "desc":"100家主流网站通发",
                    "effect":"预计曝光量100万+，阅读量30万+"
                }
            ]
        }
    ],
    taobao:[
        {
            "name":"淘宝达人资源包一",
            "desc":"套餐一",
            "price":"套餐价 12万",
            "avatar":"../../images/ic_go_04.png",
            "contents":[
                {
                    "name":"淘宝头条",
                    "desc":"15篇内容",
                    "effect":"单条头条UV最高可达10万+，全量UV可达25万+"
                },
                {
                    "name":"淘宝清单",
                    "desc":"15篇内容",
                    "effect":"单条阅读量可达1千+，全量阅读可达2万+"
                },
                {
                    "name":"必买清单",
                    "desc":"5篇内容",
                    "effect":"单条阅读量可达1万+，全量阅读可达10万+"
                }
            ]
        },
        {
            "name":"淘宝达人资源包二",
            "desc":"套餐二",
            "price":"套餐价 20万",
            "avatar":"../../images/ic_go_04.png",
            "contents":[
                {
                    "name":"淘宝头条",
                    "desc":"30篇内容",
                    "effect":"单条头条UV最高可达10万+，全量UV可达50万+"
                },
                {
                    "name":"淘宝清单",
                    "desc":"15篇内容",
                    "effect":"单条阅读量可达1千+，全量阅读可达4.6万+"
                },
                {
                    "name":"必买清单",
                    "desc":"10篇内容",
                    "effect":"单条阅读量可达1万+，全量阅读可达10万+"
                },
                {
                    "name":"淘宝直播",
                    "desc":"4个网红直播",
                    "effect":"单日观看人次可达5万+，全量观看人次可带20万+"
                },
                {
                    "name":"微博大号",
                    "desc":"5个微博大号",
                    "effect":"单条转评量可达1千+，全量转评量可达5千+"
                }
            ]
        },
        {
            "name":"淘宝达人资源包三",
            "desc":"套餐三",
            "price":"套餐价 45万",
            "avatar":"../../images/ic_go_04.png",
            "contents":[
                {
                    "name":"淘宝头条",
                    "desc":"70篇内容",
                    "effect":"单条头条UV最高可达10万+，全量UV可达133万+"
                },
                {
                    "name":"淘宝清单",
                    "desc":"70篇内容",
                    "effect":"单条阅读量可达1千+，全量阅读可达11万+"
                },
                {
                    "name":"必买清单",
                    "desc":"20篇内容",
                    "effect":"单条阅读量可达1千+，全量阅读可达40万+"
                },
                {
                    "name":"淘宝直播",
                    "desc":"10个网红直播",
                    "effect":"单日观看人次可达5万+，全量观看人次可带40万+"
                },
                {
                    "name":"微博大号",
                    "desc":"8个微博大号",
                    "effect":"单条转评量可达1.5千+，全量转评量可达5.2万+"
                },
                {
                    "name":"爱逛街 有好货",
                    "desc":"5篇内容",
                    "effect":"单条阅读量可达10万+，全量阅读可达50万+"
                }
            ]
        }
    ],
    foreign:[
        {
            name:"海外超值包",
            desc:"套餐一",
            price:"套餐价 2万",
            avatar:"../../images/ic_go_05.png",
            contents:[
                {
                    name:"美国时代广场",
                    projs:[
                        {
                            name:"路透单张图片（仅限7号屏）",
                            desc:"轮播图片，每天播出3到5次，每次15秒，以图片形式进行反馈",
                        },{
                            name:"软文（20个媒体）",
                            desc:"全国媒体发稿",
                        }
                    ]
                },
            ]
        },{
            name:"海外实惠包",
            desc:"套餐二",
            price:"套餐价 6万",
            avatar:"../../images/ic_go_05.png",
            contents:[
                {
                    name:"美国时代广场",
                        projs:[
                            {
                                name:"路透30秒视频",
                                desc:"30秒视频",
                            },{
                                name:"软文（25个媒体）",
                                desc:"全国媒体发稿",
                            }
                        ]
                }
            ]
        },{
            name:"海外聚划算",
            desc:"套餐三",
            price:"套餐价 30万",
            avatar:"../../images/ic_go_05.png",
            contents:[
                {
                    name:"美国时代广场",
                        projs:[
                            {
                                name:"纳斯达克 + 路透屏",
                                desc:"30秒视频，双屏2天循环228次；60秒视频，双屏2天循环120次",
                            },{
                                name:"街头采访",
                                desc:"路人及CEO采访，以视频形式反馈",
                            }
                        ]
                }
            ]
        },{
            name:"海外全球包",
            desc:"套餐四",
            price:"套餐价 70万",
            avatar:"../../images/ic_go_05.png",
            contents:[
                {
                    name:"美国时代广场",
                        projs:[
                            {
                                name:"路透单张图片（仅限7号屏）",
                                desc:"轮播图片，每天播出3到5次，每次15秒，以图片形式进行反馈",
                            },{
                                name:"纳斯达克+路透屏",
                                desc:"30秒视频，双屏2天循环228次；60秒视频，双屏2天循环120次",
                            }
                        ]
                },{
                    name:"英国伦敦",
                        projs:[
                            {
                                name:"皮卡迪利圆环大屏",
                                desc:"1小时独占式投放",
                            }
                        ]
                },{
                    name:"法国巴黎",
                        projs:[
                            {
                                name:"四季购物中心组合大屏",
                                desc:"3块巨型屏幕组合：覆盖250平方米，360°环形屏幕，循环四小时",
                            }
                        ]
                },{
                    name:"日本东京",
                        projs:[
                            {
                                name:"银座线新桥站出口屏幕",
                                desc:"15秒视频单日循环32次",
                            }
                        ]
                }
            ]
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
  setupCall : function(e){
    wx.makePhoneCall({
      phoneNumber: hycomm.phone_number,
      success: function(res) {
        // do nothing.
      }
    });
  },
  onLoad:function(options){
    var title = "加载数据失败", currpack = null;

    //页面初始化 options为页面跳转所带来的参数
    //this.setData({ptype:this.data.PACKTYPE.FOREIGN,packages:allpacks.foreign});
    //this.setData({ptype:this.data.PACKTYPE.STAR,packages:allpacks.star});
    //this.setData({ptype:this.data.PACKTYPE.ZHIHU,packages:allpacks.zhihu});
    //this.setData({ptype:this.data.PACKTYPE.TECH,packages:allpacks.tech});
    //this.setData({ptype:this.data.PACKTYPE.TAOBAO,packages:allpacks.taobao});
    //return;

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