module.exports =
    {
        MemberQuery: MemberQuery,
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser,
        Login: Login,
        Register: Register,
        MemberPointQuery: MemberPointQuery,
        MemberCouponQuery: MemberCouponQuery,
        MemberNums: MemberNums,

        checkOut: checkOut,
        getCurrentUserForIndex: getCurrentUserForIndex,
        getWeiXinUserInfo: getWeiXinUserInfo
    }

var MEMBER_QUERY = 'MEMBER_QUERY';
var MEMBER_LOGIN = 'MEMBER_LOGIN';
var MEMBER_REGISTER = 'MEMBER_REGISTER';
var MEMBER_POINT_QUERY = 'MEMBER_POINT_QUERY';
var MEMBER_COUPON_QUERY = 'MEMBER_COUPON_QUERY';
var MEMBER_NUM = 'MEMBER_NUM';
var MEMBER_MODIFY = 'MEMBER_MODIFY';
var CURRENT_USER = 'CURRENT_USER';
var WX_DECRYPT_USER_INFO = 'WX_DECRYPT_USER_INFO';
var baseRQ = require('../models/BaseRQ.js');
var apiService = require("apiService.js");
var configs = require('../configs.js');
var sha1 = require('../sha1.js');
var http = require('../http.js');
var util = require('../util.js');
var MemberQueryRQ = require('../models/MemberQueryRQ.js');
var MemberLoginRQ = require('../models/MemberLoginRQ.js');
var MemberRegisterRQ = require('../models/MemberRegisterRQ.js');
var MemberPointQueryRQ = require('../models/MemberPointQueryRQ.js');
var MemberCouponQueryRQ = require('../models/MemberCouponQueryRQ.js');
var MemberNumsRQ = require('../models/MemberNumsRQ.js');

//会员数量
function MemberNums(request, callback) {
    var url = apiService.getApiSetting(MEMBER_NUM);
    var data = MemberNumsRQ.getInstance().create(request.MemberNO, request.Keys);
    http.invoke(url, data, function (res) {
        if (callback != null)
            callback(res);
    });
}

//会员优惠券列表
function MemberCouponQuery(request, callback) {
    var url = apiService.getApiSetting(MEMBER_COUPON_QUERY);
    //var data = MemberCouponQueryRQ.getInstance().create(request.MemberNo, request.CouponCodes, request.CouponState, request.HotelId, request.Channel, request.OrderId, request.RentType, request.BrandCode, request.ActId, request.StartDate, request.EndDate, request.NeedDetail, request.CouponType, request.Expire);
    //var CouponList = null;
    // http.invoke(url, request, function (res) {
    //     CouponList = res.CouponList;
    //     if (callback != null)
    //         callback(CouponList);
    // });
    // if (callback != null)
    //     callback(CouponList);
    // return CouponList;

    http.invoke(url, request, function (res) {
        //CouponList = res.CouponList;
        if (callback != null)
            callback(res);
    });
}

//会员积分列表
function MemberPointQuery(request, callback) {
    var url = apiService.getApiSetting(MEMBER_POINT_QUERY);
    var data = MemberPointQueryRQ.getInstance().create(request.MemberNo);
    var PointList = null;
    http.invoke(url, data, function (res) {
        PointList = res.Points;
        if (callback != null)
            callback(PointList);
    });
    if (callback != null)
        callback(PointList);
    return PointList;
}

//会员查询
function MemberQuery(request, callback, bizerror) {
    var url = apiService.getApiSetting(MEMBER_QUERY);
    var data = MemberQueryRQ.getInstance().create(request.Key, request.QueryType, request.NeedEvents, request.NeedAvatar);
    //var user = getCurrentUser();
    http.invoke(url, data, function (res) {
        if (callback != null)
            callback(res);
    }, null, bizerror);
}

//会员登录
function Login(request, callback) {
    var url = apiService.getApiSetting(MEMBER_LOGIN);
    var data = MemberLoginRQ.getInstance().create(request.UserName, request.Password, request.PasswordType, request.DeviceId);
    http.invoke(url, data, function (res) {
        //setCurrentUser(res);
        if (callback != null)
            callback(res);
    });
}

//会员注册
function Register(request) {
    var url = apiService.getApiSetting(MEMBER_REGISTER);
    //实例化请求参数
    var data = MemberRegisterRQ.getInstance().create(request.Telephone, request.DeviceId, request.SalerCode, request.CheckCodeType, request.Key, request.MemberName, request.Emaile, request.PapersType, request.PapersNo, request.Password
    );
    //注册成功后，重新登录
    http.invoke(url, data);
}

//更新会员信息
function Update(request, callback) {
    //var url="http://10.44.100.38:8077/Member/MemberModify"
    var url = apiService.getApiSetting(MEMBER_MODIFY);
    http.invoke(url, request, function (res) {
        if (callback != null)
            callback(res);
    });
}

function getCurrentUser(redirect_data,behaviour) {
    //如果是强制登录,则跳转到登录页面,否则只查询是否
    if(util.isNullOrEmpty(behaviour))
    {
        behaviour = "REDIRECT";
    }
    var member = wx.getStorageSync('CURRENT_USER');
    if (util.isNullOrEmpty(member) && !util.isNullOrEmpty(redirect_data)) {
        wx.redirectTo({
            url: '../../pages/member/login?behaviour='+behaviour+'&redirect_data=' + JSON.stringify(redirect_data),
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
    }
    return member;
}

function getCurrentUserForIndex(redirect_data, callback,behaviour) {
    if(util.isNullOrEmpty(behaviour))
    {
        behaviour = "REDIRECT";
    }
    var member = wx.getStorageSync(CURRENT_USER);
    if (util.isNullOrEmpty(member) && !util.isNullOrEmpty(redirect_data)) {
        var userToken = apiService.getUserToken(function (userToken) {
            MemberQuery({ Key: userToken, QueryType: "USER_TOKEN" }, function (result) {
                setCurrentUser(result);
                if (result == null) {
                    wx.redirectTo({
                        url: '../../pages/member/login?behaviour='+behaviour+'&redirect_data=' + JSON.stringify(redirect_data),
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
                    return;
                }
                callback(result);

            }, function (e) {
                var userInfo = wx.getStorageSync('WX_USER_INFO');
                if (util.isNullOrEmpty(userInfo)) {
                    util.hideLoading();
                    _onload = true;
                    _page.setData({
                        onload: _onload
                    });
                    return;
                }
                var unionid = userInfo.UserInfo.unionId;
                var memberRQ = baseRQ.getInstance().create();
                memberRQ.Key = unionid;
                memberRQ.QueryType = 'WX_UNION_ID';
                MemberQuery(memberRQ, function (member2) {
                    setCurrentUser(member2);
                    if (member2 == null) {
                        wx.redirectTo({
                            url: '../../pages/member/login?behaviour=REDIRECT&redirect_data=' + JSON.stringify(redirect_data),
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
                        return;
                    }
                    callback(result);
                }, function (res2) {
                    wx.redirectTo({
                        url: '../../pages/member/login?behaviour=REDIRECT&redirect_data=' + JSON.stringify(redirect_data),
                        success: function (res) {
                            // success
                        },
                        fail: function () {
                            // fail
                        },
                        complete: function () {
                            // complete
                        }
                    });
                });

            });
        });

    }
    else {
        callback(member);
    }
}

function setCurrentUser(user) {
    return wx.setStorageSync(CURRENT_USER, user);
}
//退出登录
function checkOut() {
    wx.setStorageSync('CURRENT_USER', null);
    wx.setStorageSync('UserToken', null)
    return;
}

function getWeiXinUserInfo(request, callback) {
    var url = configs.getInstance().api_url + "/WeiXin/DecryptUserInfo";
    //注册成功后，重新登录
    http.invoke(url, request, callback);
}