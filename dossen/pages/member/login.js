// pages/member/member.js 登录表框页
var baseRQ = require('../../utils/models/BaseRQ.js');
var memberService = require('../../utils/service/memberService.js');
var apiService = require("../../utils/service/apiService.js");
var commonService = require('../../utils/service/commonService.js');
var util = require('../../utils/util.js');
//var encrypt = require('../../utils/WXBizDataCrypt.js');
var MEMBER_QUERY = apiService.getApiSetting('MEMBER_QUERY');
var User = null;
var _options = null;
var _onload = null;
var _page = null;
var _checkvaluable = true;
var deviceid = null;
var interval_SendMobile = null; //定时器
Page({
  data: {
    member: [],
    loginClose: '/images/login_close.png',
    code: true,
    password: true,
    forget: true,
    pointOut: true,
    close1: true,
    close2: true,
    value: '',
    valuepsw: '',
    userName: '',
    loginType: 'commonLogin',
    memberStatus: 'sign',
    checkCodeTips: '获取验证码'
  },
  infoTap: function () {
    this.setData({
      code: false,
      password: false,
      forget: false,
      loginType: 'validateLogin',
    })
  },
  bindKeyInput1: function (e) {
    if (e.detail.value != null) {
      this.setData({
        userName: e.detail.value,
        close1: false
      })
    } else {
      this.setData({
        close1: true
      })
    }
  },
  bindKeyInput2: function (e) {
    if (e.detail.value != null) {
      this.setData({
        close2: false
      })
    } else {
      this.setData({
        close2: true
      })
    }
  },
  closeTap: function (e) {
    this.setData({
      value: '',
      close1: true
    })
  },
  closeTap2: function (e) {
    this.setData({
      valuepsw: '',
      close2: true
    })
  },
  onLoad: function (options) {
    console.log("login");
    //_onload = true;
    _options = options;
    _page = this;
    wx.setNavigationBarTitle({
      title: '会员登录',
    });


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    wxLogin(function () {
      util.showLoading();
      var wx_user_info = wx.getStorageSync('WX_USER_INFO');
      deviceid = wx_user_info != null ? 'WXAPP' + wx_user_info.UserInfo.unionId : 'WXAPP';
      if (_options.Method != 'Login') {
        trylogin();
      }
      if (_options.Method == 'Login') {
        util.hideLoading();
        _page.setData({
          onload: true
        });
      }
    });

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //登录
  formBindsubmit: function (e) {
    var tel = e.detail.value.userName;
    var psw = e.detail.value.psw;
    var checkCode = e.detail.value.checkCode;
    //判断登录类型
    if (this.data.loginType == 'validateLogin') {//验证登录
      if (tel.length == 0 || checkCode.length == 0) {
        util.showError("提示", "手机或者密码不能为空");
        return;
      }
      if (!util.checkPhone(tel)) {
        util.showError("提示", "手机号码输入不正确");
        return;
      }
      if (this.data.memberStatus == "unsigned") {//注册
        var request = baseRQ.getInstance().create();
        request.Telephone = tel.trim();
        request.Key = checkCode.trim();
        request.CheckCodeType = 'REGISTER';
        request.DeviceId = deviceid;
        memberService.Register(request, function (res) {
          util.hideLoading();
          //memberService.setCurrentUser(res); //需要重新登录
          redirect();
        });
      } else {//动态登录
        var request = baseRQ.getInstance().create();
        request.UserName = tel.trim();
        request.Password = checkCode.trim();
        request.PasswordType = 'MOBILE_CHECKCODE';
        request.DeviceId = deviceid;
        // memberService.Login(request, function (res) {
        //   util.hideLoading();
        //   memberService.setCurrentUser(res);
        //   redirect();
        // });
        Login(request, function (res) {
          util.hideLoading();
          memberService.setCurrentUser(res);
          redirect();
        });
      }
    } else {
      if (tel.length == 0 || psw.length == 0) {
        util.showError("提示", "手机或者验证码不能为空");
        return;
      }
      if (!util.checkPhone(tel)) {
        util.showError("提示", "手机号码输入不正确");
        return;
      }
      util.showLoading();
      var request = baseRQ.getInstance().create();
      request.UserName = tel.trim();
      request.Password = psw.trim();
      request.PasswordType = 'USER_PASSWORD';
      request.DeviceId = deviceid;
      // memberService.Login(request, function (res) {
      //   util.hideLoading();
      //   memberService.setCurrentUser(res);
      //   redirect();
      // });
      Login(request, function (res) {
        util.hideLoading();
        memberService.setCurrentUser(res);
        redirect();
      });
    }
  },
  //获取验证码
  getCheckCode: function (e) {
    if (!_checkvaluable) {
      util.showError("提示", "请稍后获取验证码");
      return;
    }
    var that = this;
    var tel = this.data.userName;
    if (tel.length == 0) {
      util.showError("提示", "请输入手机号码");
      return;
    }
    if (!util.checkPhone(tel)) {
      util.showError("提示", "手机号码输入不正确");
      return;
    }
    //移除点击事件 
    var request = baseRQ.getInstance().create();
    request.Key = tel.trim();
    request.QueryType = 'TELEPHONE';
    _checkvaluable = false;
    //判断是注册还是登录
    wx.request({
      url: apiService.getApiSetting('MEMBER_QUERY') + '?Token=' + wx.getStorageSync('ApiToken').Token,
      data: request,
      method: 'POST',
      success: function (res) {
        if (res.data.errcode != 0) {//会员不存在
          request.CheckCodeType = 'REGISTER';
          that.setData({
            memberStatus: 'unsigned'
          })
          //开始倒计时
          clearInterval(interval_SendMobile);
          SetSendVoiceDisable(that);
          commonService.CheckCodeGenerate(request, function (res) {
          });
        } else {
          request.CheckCodeType = 'LOGIN';
          //开始倒计时
          clearInterval(interval_SendMobile);
          SetSendVoiceDisable(that);
          commonService.CheckCodeGenerate(request, function (res) {
          });
        }
      }
    })
  }
});

function trylogin() {
  var user = wx.getStorageSync('CURRENT_USER');
  if (util.isNullOrEmpty(user)) {
    apiService.getUserToken(function (userToken) {
      var request = new Object();
      request.Key = userToken;
      request.QueryType = 'USER_TOKEN';
      request.NeedEvents = true;
      request.NeedAvatar = true;
      memberService.MemberQuery(request, function (member) {
        _onload = true;

        if (member == null)
          return;
        memberService.setCurrentUser(member);
        redirect();
        _page.setData({
          onload: _onload
        });
        util.hideLoading();
      }, function (res) {
        //userToken获取数据不成功 改用UNION_ID获取
        var userInfo = wx.getStorageSync('WX_USER_INFO');
        if (util.isNullOrEmpty(userInfo)) {
          util.hideLoading();
          _onload = true;
          _page.setData({
            onload: _onload
          });
          return;
        }
        var unionid = userInfo.UserInfo.unionId;
        var memberRQ = baseRQ.getInstance().create();
        memberRQ.Key = unionid;
        memberRQ.QueryType = 'WX_UNION_ID';
        memberService.MemberQuery(memberRQ, function (member2) {
          _onload = true;

          if (member2 == null)
            return;
          // var request = baseRQ.getInstance().create();
          // request.UserName = member2.tel.trim();
          // request.Password = member2.psw.trim();
          // request.PasswordType = 'USER_PASSWORD';
          // request.DeviceId = deviceid;
          // Login(request, )
          memberService.setCurrentUser(member2);
          redirect();
          _page.setData({
            onload: _onload
          });
          util.hideLoading();
        }, function (res2) {
          util.hideLoading();
          _onload = true;
          _page.setData({
            onload: _onload
          });
        });
      });
    });

  }
}

function redirect() {
  switch (_options.behaviour) {
    case "BACK":
      {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        });
        break;
      }
    case "REDIRECT":
      {
        var redirect_data = JSON.parse(_options.redirect_data);
        wx.redirectTo({
          url: redirect_data.url + "?request=" + JSON.stringify(redirect_data.options),
          success: function (res) {
            // success
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
        break;
      }
    case "SWITCH":
    {
       var redirect_data = JSON.parse(_options.redirect_data);
        wx.switchTab({
          url: redirect_data.url + "?request=" + JSON.stringify(redirect_data.options),
          success: function (res) {
            // success
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
        break;
    }
    default:
      {
        wx.switchTab({
          url: 'member',
          success: function (res) {
            // success
          },
          fail: function (e) {
            // fail
          },
          complete: function () {
            // complete
          }
        })
        break;
      }
  }
}

function SetSendVoiceDisable(obj) {
  var i = 60;
  interval_SendMobile = setInterval(function () {
    i--;
    if (i <= 0) {
      _checkvaluable = true;
      obj.setData({
        checkCodeTips: "获取验证码"
      })
    }
    else {
      obj.setData({
        checkCodeTips: "" + i + "S后重新获取"
      })
    }
  }, 1000)
}


function Login(request, callback) {
  memberService.Login(request, callback);
}

//获取微信unionid
function wxLogin(callback) {
  var userInfo = wx.getStorageSync('WX_USER_INFO');
  if (!util.isNullOrEmpty(userInfo)) {
    callback(userInfo);
    return;
  }
  wx.login({
    success: function (res) {
      wx.getUserInfo({
        success: function (result) {
          var request = baseRQ.getInstance().create();
          request.Code = res.code
          request.EncryptedData = result.encryptedData;
          request.IV = result.iv;
          memberService.getWeiXinUserInfo(request, function (user) {
            wx.setStorageSync('WX_USER_INFO', user)
            callback(user);
          });
        },
        fail: function () {
          // fail
          wxLogin(callback);
        },
        complete: function () {
          // complete
        }
      })
    },
    fail: function () {
      wxLogin(callback);
    },
    complete: function () {
      // complete
    }
  });
}
