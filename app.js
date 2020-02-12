//app.js
import requestUrl from './utils/util.js';

App({
      onLaunch: options => {
            wx.login({
                  success: res => {
                        if (res.code) {
                              requestUrl.requestUrl({
                                          url: 'public/loginByCode/wechatMini?code=' + res.code,
                                          params: {},
                                          method: "post",
                                    }).then(function(res) {
                                          console.info(res)
                                          wx.setStorageSync('token', res.data.data.token);
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