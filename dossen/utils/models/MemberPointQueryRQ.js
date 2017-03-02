module.exports = 
{
    getInstance:getInstance
}

var baseRQ = require('BaseRQ.js');
function getInstance()
{
    var instance =
    {
        create:function(MemberNo)
        {
            var request = baseRQ.getInstance().create();
            request.MemberNo = MemberNo;
            return request;
        }
    }
    return instance;
}