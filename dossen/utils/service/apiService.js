module.exports = 
{
    getApiToken:getApiToken,
    getUserToken:getUserToken,
    getApiSettings:getApiSettings,
    getApiSetting:getApiSetting
}

var API_TOKEN_QUERY = 'api/token';
var API_SETTING_GET = 'api/setting'
var API_USER_TOKEN_GENERATE = 'api/UserTokenGenerate';

var configs = require('../configs.js');
var sha1 = require('../sha1.js');
var http = require('../http.js');
var util = require('../util.js');
var baseRQ = require('../models/BaseRQ.js');
var ApiTokenQueryRQ = require('../models/ApiTokenQueryRQ.js');
var ApiUserTokenGenerateRQ = require('../models/ApiUserTokenGenerateRQ.js');

function getApiToken(forceUpdate,callback)
{
    var apiToken = wx.getStorageSync('ApiToken');
    if(!forceUpdate&&!util.isNullOrEmpty(apiToken))
    {
        var date = new Date(apiToken.ExpiredTime);
        //过期时间大于10分钟直接返回
        if(date.getTime()-Date.now()>configs.getInstance().token_expire)
        {
           if(callback!=null)
             callback(apiToken.Token);
           return apiToken.Token;
        }
    }
    var url = configs.getInstance().api_url+API_TOKEN_QUERY;
    var timeStamp = Date.now();
    var sign = sha1.hex_sha1(configs.getInstance().appId+timeStamp+configs.getInstance().appSecret).toUpperCase();
    var data = ApiTokenQueryRQ.getInstance().create(configs.getInstance().appId,timeStamp,sign);
    wx.request(
        {url:url,
        data:data,
        method:'POST',
        success:function(res){
        if(res.statusCode!=200)
        {
           throw res.statusCode;
        }
        wx.setStorageSync('ApiToken',res.data.data);
        if(callback!=null)
            callback(res.data.data.Token)
        }
    });
    //  if(callback!=null)
    //       callback(apiToken.Token)
    // return apiToken.Token;
}


function getApiSettings(callback)
{
    var url = configs.getInstance().api_url+API_SETTING_GET;
    var data = baseRQ.getInstance().create();
    http.invoke(url,data,function(res){
        var settings = new Array();
        for(var i = 0; i<res.ApiSettings.length;i++)
        {
            //settings[res.ApiSettings[i].Code] = res.ApiSettings[i];
            wx.setStorageSync('ApiSetting-'+res.ApiSettings[i].Code, res.ApiSettings[i]);
        }
        //wx.setStorageSync('ApiSetting', settings);
        if(callback!=null)
          callback(settings)
    });
}

function getApiSetting(key)
{
    return wx.getStorageSync('ApiSetting-'+key)==null?null:wx.getStorageSync('ApiSetting-'+key).Value;
}

function getUserToken(callback)
{
    var url = configs.getInstance().api_url+API_USER_TOKEN_GENERATE;
    var userToken = wx.getStorageSync('UserToken');
    if(util.isNullOrEmpty(userToken))
    {
        var data = ApiUserTokenGenerateRQ.getInstance().create('wx-app-'+Date.now(),'wx-app');
        http.invoke(url,data,function(res){
        wx.setStorageSync('UserToken', res.UserToken);
        if(callback!=null)
            callback(res.UserToken);
     });
    }
    if(callback!=null)
       callback(userToken);
    return userToken;
}