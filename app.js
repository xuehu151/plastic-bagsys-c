//app.js
import requestUrl from './utils/util.js';

App({
      onLaunch: function (options)  {
            let self = this;
            wx.login({
                  success: res => {
                        if (res.code) {
                              requestUrl.requestUrl({
                                          url: 'public/loginByCode/wechatMini?code=' + res.code,
                                          params: {},
                                          method: "post",
                                    }).then(function(res) {
                                          wx.setStorageSync('token', res.data.data.token);
                                          wx.getUserInfo({
                                                success: function (res) {
                                                      // console.info(self)
                                                      self.globalData.userInfo = res.userInfo;
                                                      requestUrl.requestUrl({
                                                                  url: 'sys/member/edit',
                                                                  params: {
                                                                        headImg: res.userInfo.avatarUrl,
                                                                        nickname: res.userInfo.nickName
                                                                  },
                                                                  method: "post",
                                                            }).then(function(res) {
                                                                  console.info(res)
                                                            })
                                                            .catch((errorMsg) => {
                                                                  //error
                                                            })
                                                }
                                          })
                                    })
                                    .catch((errorMsg) => {
                                          //error
                                    })
                        }
                  }
            })
      },
      globalData: {
            userInfo: null,
            success: false,
            nobag: false,
            shopping: false
      }
})