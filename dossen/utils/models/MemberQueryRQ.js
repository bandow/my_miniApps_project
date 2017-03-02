module.exports = 
{
    getInstance:getInstance
}

var baseRQ = require('BaseRQ.js');
function getInstance()
{
    var instance =
    {
        create:function(Key,QueryType,NeedEvents,NeedAvatar)
        {
            var request = baseRQ.getInstance().create();
            request.Key = Key;
            request.QueryType = QueryType;
            request.NeedEvents = NeedEvents;
            request.NeedAvatar = NeedAvatar;
            return request;
        }
    }
    return instance;
}