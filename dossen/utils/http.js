module.exports = {
  invoke: invoke,
}


var util = require("util.js");
var configs = require("configs.js");
function invoke(url,data,success,fail,bizerror,complete,retryCount)
{
    if(retryCount==null)
    {
      retryCount = 0
      };
    var actualUrl = compileUrl(url);
    if(fail==null)
    {
       fail = function(e){
           wx.showModal({
               title:'访问错误',
               message:e.responseText
           })
       }
    }
    if(complete==null)
    {
        complete = function(){
         
        };
    }
    if(bizerror==null)
    {
        bizerror = function(res)
        {
              wx.showModal({
               title:'请求错误',
               content:"错误码:"+res.data.errcode+"\r\n"+res.data.errmsg,
               showCancel:false
              });
              util.hideLoading();
              return;
        }
    }
    wx.request({
      url: actualUrl,
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          //不成功抛出错误
          if(res.statusCode!=200)
          {
              wx.showModal({
               title:'访问错误',
               content:"错误码:"+res.statusCode,
               showCancel:false
              })
          }
          else
          {
             //如果判断token失效则重新请求token
             if(res.data.errcode==-90001)
             {
                var apiService = require('service/apiService.js');
                apiService.getApiToken(true,function(r){
                    //若重试超过5次则不再重试,防止消耗资源
                    if(retryCount>=5)
                    {
                        return;
                    }
                    retryCount++;
                    invoke(url,data,success,fail,bizerror,complete,retryCount)
                });
                return;
            }
            else if(res.data.errcode!=0)
            {
              bizerror(res);
              return;
            }
            success(res.data.data)
          }
      },
      fail: fail,
      complete:complete
    })
}

function compileUrl(url)
{
    if(util.isNullOrEmpty(url))
       throw "路径错误";
    // if(path.indexOf('http')<0){
    //     return configs.getInstance().api_url+path+'?Token='+wx.getStorageSync('ApiToken').Token;
    // }
    // else{
        return url+'?Token='+wx.getStorageSync('ApiToken').Token;
    // }
}

