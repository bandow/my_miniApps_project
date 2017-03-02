module.exports = {
    orderQuery: orderQuery,
    orderCaculate: orderCaculate,
    orderCouponQuery: orderCouponQuery,
    orderSubmit: orderSubmit,
    orderCancel: orderCancel,
    orderPayCall: orderPayCall,
    orderPayCheck: orderPayCheck,
    setOrderOptions:setOrderOptions,
    getOrderOptions:getOrderOptions
}
var http = require('../http.js');
var apiService = require('apiService.js');
var BaseRQ = require('../models/BaseRQ.js');
var HOTEL_ORDER_QUERY = 'HOTEL_ORDER_QUERY';
var HOTEL_ORDER_CACULATE = 'HOTEL_ORDER_CACULATE';
var HOTEL_ORDER_COUPON_QUERY = apiService.getApiSetting('HOTEL_ORDER_COUPON_QUERY');
var HOTEL_ORDER_SUBMIT = 'HOTEL_ORDER_SUBMIT';
var ORDER_CANCEL = apiService.getApiSetting('ORDER_CANCEL');
var ORDER_PAY_CALL = apiService.getApiSetting('ORDER_PAY_CALL');
var ORDER_PAY_CHECK = apiService.getApiSetting('ORDER_PAY_CHECK');
var HOTEL_ORDER_CANCEL = apiService.getApiSetting('HOTEL_ORDER_CANCEL');

function orderQuery(request, callback) {
    var url = apiService.getApiSetting(HOTEL_ORDER_QUERY);
    http.invoke(url, request, callback);
}

function orderCaculate(request, callback) {
    var url = apiService.getApiSetting(HOTEL_ORDER_CACULATE);
    http.invoke(url, request, callback);
}

function orderCouponQuery(request, callback) {
    http.invoke(HOTEL_ORDER_COUPON_QUERY, request, callback);
}

function orderSubmit(request, callback) {
    var url = apiService.getApiSetting(HOTEL_ORDER_SUBMIT);
    http.invoke(url, request, callback);
}

function orderCancel(request, callback) {
    http.invoke(HOTEL_ORDER_CANCEL, request, callback);
}

function orderPayCall(request, callback) {
    http.invoke(ORDER_PAY_CALL, request, callback);
}

function orderPayCheck(request, callback) {
    http.invoke(ORDER_PAY_CHECK, request, callback);
}

function setOrderOptions(key,value)
{
    var getKey = "resvervation_options_"+key;
    wx.setStorageSync(getKey, value);
    return value;
}

function getOrderOptions(key)
{
    var getKey = "resvervation_options_"+key;
    return wx.getStorageSync(getKey);
}





