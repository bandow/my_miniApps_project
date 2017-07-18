/**
 *  zhoujianheng @ Shanghai Hanyun Info Tech Corp.
 */
'use strict';

var Promise = require('./bluebird');

/**
 * http请求服务器API的结构
 * @param  {String} url    请求地址
 * @param  {String} method 请求方式
 * @param  {Objece} params json参数列表
 * @return {Promise}       包含抓取任务的Promise
 */
module.exports = function (url,method,params) {
    return new Promise(function (resolve, reject) {
        var settings = {
    	    url:url,
    	    method:'GET',
    	    header:{'Content-Type':'json'},
    	    success:resolve,
    	    fail:reject
        };
        if(params){
            params.method && (settings.method = method.toUpperCase());
            params.data && (settings.data = Object.assign({},params.data));
            params.header && (settings.header = Object.assgin({},params.header));
        } 
        wx.request(settings);
    });
};
