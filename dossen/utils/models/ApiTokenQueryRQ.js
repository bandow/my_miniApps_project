module.exports = 
{
    getInstance:getInstance
}

var baseRQ = require('BaseRQ.js');


function getInstance()
{
    var instance =
    {
        create:function(AppId,TimeStamp,Sign)
        {
            var request = baseRQ.getInstance().create();
            request.SignType='sha1';
            request.AppId = AppId;
            request.TimeStamp = TimeStamp;
            request.Sign = Sign;
            return request;
        }
    }
    return instance;
}

