module.exports = 
{
    getInstance:getInstance
}

var baseRQ = require('BaseRQ.js');


function getInstance()
{
    var instance =
    {
        create:function(DeviceId,MobileModel)
        {
            var request = baseRQ.getInstance().create();
            request.DeviceId=DeviceId;
            request.MobileModel = MobileModel;
            return request;
        }
    }
    return instance;
}

