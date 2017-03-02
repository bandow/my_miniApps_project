module.exports =
    {
        CheckCodeGenerate: CheckCodeGenerate,
        setCurrentLocation :setCurrentLocation,
        setOrderSession:setOrderSession,
        clearOrderSession:clearOrderSession,
        getOrderSession:getOrderSession,
        queryCityCodeByLocation:queryCityCodeByLocation,
    }

//公共文件引入
var configs = require('../configs.js');
var sha1 = require('../sha1.js');
var http = require('../http.js');
var util = require('../util.js');
var baseRQ = require('../models/BaseRQ.js');

//引入服务
var apiService = require("apiService.js");

//url 常量
var COMMON_CHECKCODE_GENERATE = 'COMMON_CHECKCODE_GENERATE';
var QUERY_CITY_NAME = 'QUERY_CITY_NAME';
//request
var CommonCheckCodeGenerateRQ = require('../models/CommonCheckCodeGenerateRQ.js');

function CheckCodeGenerate(request, callback) {
    var url = apiService.getApiSetting(COMMON_CHECKCODE_GENERATE);
    var data = CommonCheckCodeGenerateRQ.getInstance().create(request.CheckCodeType, request.Key);
    http.invoke(url, data, function (res) {
        if (callback != null)
            callback(res);
    });
}

function queryCityCodeByLocation(request,callback){
    var url = apiService.getApiSetting(QUERY_CITY_NAME);
    console.log(url);
    http.invoke(url, request, function (res) {
        if (callback != null)
            callback(res);
    });
}


function setCurrentLocation(location, callback) {
    wx.setStorageSync('CURRENT_LOCATION', Location);
    if (callback != null)
        callback(location);
}

function setOrderSession(session){
    wx.setStorageSync('ORDER_SESSION', session);
}

function clearOrderSession(){
    wx.setStorageSync('ORDER_SESSION', null);
}

function getOrderSession(){
   var session = wx.getStorageSync('ORDER_SESSION');
   if(util.isNullOrEmpty(session))
      session = new Object();
    return session;
}