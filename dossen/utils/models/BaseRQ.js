module.exports = {
    getInstance: getInstance
}

var configs = require('../configs.js');
var common = require('../common.js');
function getInstance() {
    var instance =
        {
            create: function () {
                var baseRQ = {
                    Version: configs.getInstance().version,
                    Extendsions: '',
                    ApiUser: {
                        UserIP: '127.0.0.1',
                        UserLocation: wx.getStorageSync('UserLocation'),
                        UserToken: common.getUserToken()
                    },
                    ApiChannel: {
                        AppId: configs.getInstance().appId
                    },
                }
                return baseRQ;
            }
        }
    return instance;
}

