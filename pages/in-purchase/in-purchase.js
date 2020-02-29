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
                                    if (!res.data.data) {
                                          wx.showLoading({
                                                title: res.data.message,
                                          });
                                          setTimeout(() => {
                                                wx.hideLoading();
                                          }, 2000)
                                    } else {
                                          wx.navigateTo({
                                                url: '../payment/payment?Price=' + res.data.data.price + '&consignee=' + self.data.consignee + '&sn=' + res.data.data.sn
                                          })
                                    }
                              } else {
                                    let self = this;
                                    if (res.data.data) {
                                          requestUrl.requestUrl({
                                                url: "biz/order/scan/findBySn?sn=" + res.data.data.sn,
                                                params: {},
                                                method: "get",
                                          }).then(function(res) {
                                                if (res.data.code === 10000) {
                                                      if (res.data.data.status === 2) {
                                                            app.globalData.success = true;
                                                            wx.navigateTo({
                                                                  url: '../purchase/purchase'
                                                            })
                                                      } else if (res.data.data.status === 3) {
                                                            wx.showToast({
                                                                  title: '设备异常',
                                                                  icon: 'none',
                                                                  duration: 2000
                                                            })
                                                      }else{
                                                            wx.showToast({
                                                                  title: '未处理',
                                                                  icon: 'none',
                                                                  duration: 2000
                                                            })
                                                      }
                                                } else {
                                                      wx.showToast({
                                                            title: res.data.message,
                                                            icon: 'none',
                                                            duration: 2000
                                                      })
                                                }
                                          })
                                    } else {
                                          wx.showToast({
                                                title: res.data.message,
                                                icon: 'none',
                                                duration: 2000
                                          })
                                    }
                              }
                        })
                        .catch((errorMsg) => {
                              console.info(errorMsg)
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
      onLoad: function(query) { //{scene:'5'}
            if (JSON.stringify(query) !== '{}') {
                  wx.setStorageSync('scene', decodeURIComponent(query.scene));
            }
            let scene = wx.getStorageSync('scene');
            let self = this;
            wx.getSetting({
                  success: (res) => {
                        if (res.authSetting['scope.userInfo']) {
                              //根据编号查询设备
                              requestUrl.requestUrl({
                                          url: "biz/device/infoById/" + scene,
                                          params: {},
                                          method: "get",
                                    }).then(function(res) {
                                          //console.info(res.data)
                                          if (res.data.code === 10000) {
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
                                                setTimeout(() => {
                                                      wx.showLoading({
                                                            title: res.data.message,
                                                            duration: 2000,
                                                      });
                                                }, 1000)
                                                setTimeout(() => {
                                                      wx.redirectTo({
                                                            url: '../purchase/purchase'
                                                      })
                                                }, 2000)
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
                                          console.info(123456)
                                          console.info(errorMsg)
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