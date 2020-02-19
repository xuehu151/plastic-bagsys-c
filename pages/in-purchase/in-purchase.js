//index.js
//获取应用实例
let app = getApp();
import requestUrl from '../../utils/util.js'

Page({
      data: {
            defaultSize: 'default',
            imgUrl: "../images/bag.png",
            Price: '0.00',
            Sold: '0',
            consignee: '',
            runStatus: '',
            btnText: '',
            deviceCode: '',
            isPay: false
      },
      FreeCollection: function() {
            let self = this;
            if (self.data.runStatus === 1) {
                  //下单
                  requestUrl.requestUrl({
                              url: "biz/order/scan/add",
                              params: {
                                    count: 1,
                                    deviceCode: self.data.deviceCode
                              },
                              method: "post",
                        }).then(function(res) {
                              if (self.data.Price !== 0) {
                                    wx.navigateTo({
                                          url: '../payment/payment?Price=' + res.data.data.price + '&consignee=' + self.data.consignee + '&sn=' + res.data.data.sn
                                    })
                              } else {
                                    wx.navigateTo({
                                          url: '../purchase/purchase'
                                    })
                                    app.globalData.success = true;
                              }
                        })
                        .catch((errorMsg) => {
                              //error
                        })
            } else if (self.data.runStatus === 2) {
                  wx.showToast({
                        title: '设备异常，请联系管理员!',
                        icon: 'none',
                        duration: 2000,
                        mask: true
                  })
            }
      },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            let self = this;
            wx.getSetting({
                  success: (res) => {
                        if (res.authSetting['scope.userInfo']) {
                              //根据编号查询设备
                              requestUrl.requestUrl({
                                          url: "biz/device/infoByCode/LDA10001",
                                          params: {},
                                          method: "get",
                                    }).then(function(res) {
                                          if (res.data.data && res.data.data.runStatus === 1) {
                                                self.setData({
                                                      Price: res.data.data.goodsPrice,
                                                      Sold: res.data.data.totalGoodsSalesCount || 0,
                                                      runStatus: res.data.data.runStatus,
                                                      consignee: res.data.data.agentName,
                                                      deviceCode: res.data.data.deviceCode
                                                })
                                                app.globalData.success = true;
                                          } else {
                                                app.globalData.nobag = true;
                                                wx.redirectTo({
                                                      url: '../purchase/purchase'
                                                })
                                          }
                                          if (res.data.data.goodsPrice === 0) {
                                                self.setData({
                                                      btnText: '免费领取'
                                                })
                                          } else {
                                                self.setData({
                                                      btnText: '为环保事业加油!'
                                                })
                                          }
                                    })
                                    .catch((errorMsg) => {
                                          //error
                                    })
                        } else {
                              wx.redirectTo({
                                    url: '../authorize/authorize', //授权页面
                              })
                        }
                  }
            })
      },
      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function() {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function() {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function() {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function() {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function() {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function() {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function() {

      }

})