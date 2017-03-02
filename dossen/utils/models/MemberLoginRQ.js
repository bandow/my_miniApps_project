module.exports = 
{
    getInstance:getInstance
}

var baseRQ = require('BaseRQ.js');


function getInstance()
{
    var instance =
    {
        create:function(UserName,Password,PasswordType,DeviceId)
        {
            var request = baseRQ.getInstance().create();
            request.UserName = UserName;
            request.Password = Password;
            request.PasswordType = PasswordType;
            request.DeviceId = DeviceId;
            return request;
        }
    }
    return instance;
}