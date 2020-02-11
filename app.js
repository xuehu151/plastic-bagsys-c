//app.js
App({
      onLaunch: options => {
            wx.login({
                  success: res => {
                        if (res.code) {
                              wx.request({
                                    url: 'https://minapp.qudaiji.com/public/loginByCode/wechatMini?code=' + res.code,
                                    method: "post",
                                    success: res => {
                                          wx.setStorageSync('token', res.data.data.token);
                                    }
                              });
                        }
                  }
            })
      },
      globalData: {
            userInfo: null
      }
})