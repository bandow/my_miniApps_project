module.exports =
    {
        getInstance: getInstance
    }

var baseRQ = require('BaseRQ.js');
function getInstance() {
    var instance =
        {
            create: function (MemberNO, Keys) {
                var request = baseRQ.getInstance().create();
                request.MemberNO = MemberNO;
                request.Keys = Keys;
                return request;
            }
        }
    return instance;
}