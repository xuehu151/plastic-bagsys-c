//index.js
//获取应用实例
const app = getApp();
import requestUrl from '../../utils/util.js'

Page({
      data: {
            consignee: '',
            Price: '0',
            sn: ''
      },
      payMent: function() {
            let self = this;
            requestUrl.requestUrl({
                        url: "biz/pay/add",
                        params: {
                              orderSn: self.data.sn,
                              payMethod: 1
                        },
                        method: "post",
                  }).then(function(res) {
                        wx.requestPayment({
                              'timeStamp': res.data.data.timeStamp,
                              'nonceStr': res.data.data.nonceStr,
                              'package': res.data.data.packageValue,
                              'paySign': res.data.data.paySign,
                              'signType': 'MD5',
                              'success': function(res) {
                                    self.getOrderStatus(self.data.sn);
                              },
                              'fail': function(res) {
                                    console.info('22222222', res)
                              },
                              'complete': function(res) {
                                    console.info('33333333', res)
                              }
                        })
                  })
                  .catch((errorMsg) => {
                        //error
                  })
      },

      getOrderStatus(sn) {
            let self = this;
            let count = 0;
            requestUrl.requestUrl({
                  url: "biz/order/scan/findBySn?sn=" + sn,
                  params: {},
                  method: "get",
            }).then(function(res) {
                  console.info('init', res);
                  if (res.data.data.status === 1) { //购买失败  循环调取
                        app.globalData.shopFaild = true;
                        let timer = setInterval(() => {
                              requestUrl.requestUrl({
                                    url: "biz/order/scan/findBySn?sn=" + self.data.sn,
                                    params: {},
                                    method: "get",
                              }).then(function(res) {
                                    if (res.data.data.status === 2) {
                                          app.globalData.shopFaild = false;
                                          app.globalData.success = true;
                                          clearInterval(timer)
                                          wx.redirectTo({
                                                url: '../purchase/purchase'
                                          })
                                          return
                                    } else if (res.data.data.status === 3) {
                                          clearInterval(timer)
                                          wx.showLoading({
                                                title: '设备异常',
                                                duration: 2000,
                                          });
                                          return
                                    } else {
                                          app.globalData.shopFaild = true;
                                          if (count > 3) {
                                                clearInterval(timer)
                                                wx.redirectTo({
                                                      url: '../purchase/purchase'
                                                })
                                          }
                                          count++;
                                    }
                              })
                        }, 1000)
                  } else if (res.data.data.status === 2) { //成功
                        app.globalData.success = true;
                        wx.redirectTo({
                              url: '../purchase/purchase'
                        })
                  } else { //设备异常
                        wx.showLoading({
                              title: '设备异常',
                              duration: 2000,
                        });
                  }
            })
      },

      onLoad: function(options) {
            let self = this;
            self.setData({
                  Price: options.Price,
                  consignee: options.consignee,
                  sn: options.sn
            })
      }
})