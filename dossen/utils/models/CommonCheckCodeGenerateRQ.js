module.exports = 
{
    getInstance:getInstance
}

var baseRQ = require('BaseRQ.js');
function getInstance()
{
    var instance =
    {
        create:function(CheckCodeType,Key)
        {
            var request = baseRQ.getInstance().create();
            request.CheckCodeType = CheckCodeType;
            request.Key = Key;
            return request;
        }
    }
    return instance;
}
