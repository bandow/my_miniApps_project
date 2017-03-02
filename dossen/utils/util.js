module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  isNullOrEmpty: isNullOrEmpty,
  getStringDate: getStringDate,
  getDayOfWeek: getDayOfWeek,
  addDate: addDate,
  dateFormat: dateFormat,
  dateDiff: dateDiff,
  sleep: sleep,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showError:showError,
  checkPhone:checkPhone,
  showTip:showTip,
  CheckPaperNo:CheckPaperNo,
  formatDayTime:formatDayTime,
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function dateFormat(date, fmt) { //author: meizz 
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function getDayOfWeek(num) {
  switch (num) {
    case 0:
      return "周日";
    case 1:
      return "周一";
    case 2:
      return "周二";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";

  }
}

function dateDiff(startDate, endDate) {
  return (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
}

function getStringDate(date) {
  return dateFormat(date,'yyyy-MM-dd');
}

function addDate(date, days) {
  var oneDay = 86400000;
  return new Date(date.getTime() + oneDay * days);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isNullOrEmpty(s) {
  if (typeof (s) == "string")
    return s == null || s == "";
  else
    return s == null;
}


function sleep(n) {
  var start = new Date().getTime();
  while (true) if (new Date().getTime() - start > n) break;
}

function showLoading() {
  wx.showToast({
    title: '加载中...',
    icon: 'loading',
    duration:10000
  });
}

function hideLoading() {
  wx.hideToast();
}

//手机验证
function checkPhone(phone) {
  var m = phone.match(/^\s*(\S+(\s+\S+)*)\s*$/);
  phone = (m == null) ? "" : m[1];
  return (/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(phone));
}

function showError(tips, message) {
  wx.showModal({
    title: tips,
    content: message,
    showCancel: false
  });
}

function showTip(message) {
  wx.showToast({
    title: message,
    icon: 'loading'
  });
}

//验证身份证证
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X
var valCodePosition = null;
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * param a_idCard 身份证号码数组  */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
    }
    for ( var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和
    }
    valCodePosition = sum % 11;                // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * param idCard 18位书身份证字符串*/
function isValidityBrithBy18IdCard(idCard18){
    var year =  idCard18.substring(6,10);
    var month = idCard18.substring(10,12);
    var day = idCard18.substring(12,14);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if(temp_date.getFullYear()!=parseFloat(year)
            ||temp_date.getMonth()!=parseFloat(month)-1
            ||temp_date.getDate()!=parseFloat(day)){
        return false;
    }else{
        return true;
    }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * param idCard15 15位书身份证字符串  */
function isValidityBrithBy15IdCard(idCard15){
    var year =  idCard15.substring(6,8);
    var month = idCard15.substring(8,10);
    var day = idCard15.substring(10,12);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if(temp_date.getYear()!=parseFloat(year)
            ||temp_date.getMonth()!=parseFloat(month)-1
            ||temp_date.getDate()!=parseFloat(day)){
        return false;
    }else{
        return true;
    }
}
function CheckPaperNo(idCard) {
    //idCard = idCard.replace(/ /g, "");               //去掉字符串头尾空格
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组
        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
            return true;
        }else {
            return false;
        }
    } else {
        return false;
    }
}

function formatDayTime(time){
      var array = [];
      time = time.replace(/-/g, ':').replace(' ', ':');
      time = time.split(':');
      var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
      array.push(time[0]);
      array.push(time[1]);
      array.push(time[2]);
      return array.join("-");
}

function getHotelNums(list){
   var array = list.split(",");
   return "适用"+array.length+"门店";
}

