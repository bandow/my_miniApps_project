module.exports = {
  getUserToken:getUserToken
}

function getUserToken()
{
    return wx.getStorageSync('UserToken');
}