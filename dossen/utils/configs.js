module.exports = {
  getInstance:getInstance
}


var util = require("util.js")
function resolve_url(path)
{
    if(util.isNullOrEmpty(path))
       throw "路径错误";
    return api_url+path;
}

function getInstance()
{
    var configs = {
    version:'2.0.0',
    appId:'wxapp',
    appSecret:'CQEWFD60784RT8QWE',
    signType:'SHA1',
    api_url:'https://wxapp.dossen.com/',
    //api_url:'http://10.44.100.9:10006/',
    file_url:'https://resource1.dongchenghotels.com',
    token_expire:600000
    };
    return configs;
}
