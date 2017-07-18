/**
 *  zhoujianheng @ Shanghai Hanyun Info Tech Corp.
 */
/**
 * 小程序配置文件
 */

//瀚沄科技服务器配置
// var host = "fv.dreamlabchina.com"
// var apikey = "38f727d4-137d-11e7-8815-525400a750ea"

//时刻互动服务器配置
var host = "apis.socialtok.com"
var apikey = "6edb8254-1f63-11e7-8ae5-00163e025270"

var config = {
    host,
    //api-key值
    apikey,
    // 搜索请求地址
    urlReqSrch: `https://${host}/wechat/search/`,
    // 获取详情地址
    urlGetIteminfo: `https://${host}/wechat/iteminfo/`,
    //每页请求个数
    pagesize: 15,
    //推广电话
    phone_number:"02038615453",
};

module.exports = config
