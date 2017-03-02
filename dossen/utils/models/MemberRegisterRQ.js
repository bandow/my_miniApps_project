module.exports = 
{
    getInstance:getInstance
}

var baseRQ = require('BaseRQ.js');


function getInstance()
{
    var instance =
    {
        create:function(Telephone,DeviceId,SalerCode,CheckCodeType,Key,MemberName,Email,PapersType,PapersNo,Password)
        {
            var request = baseRQ.getInstance().create();
            request.Telephone = Telephone;
            request.DeviceId = DeviceId;
            request.SalerCode = SalerCode;
            request.CheckCodeType = CheckCodeType;
            request.Key = Key;
            request.MemberName = MemberName;
            request.Emaile = Email;
            request.PapersType = PapersType;
            request.PapersNo = PapersNo;
            request.Password = Password;
            return request;
        }
    }
    return instance;
}