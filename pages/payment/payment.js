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
                        console.info(res)
                        wx.requestPayment({
                              'timeStamp': res.data.data.timeStamp,
                              'nonceStr': res.data.data.nonceStr,
                              'package': res.data.data.packageValue,
                              'paySign': res.data.data.paySign,
                              'signType': 'MD5',
                              'success': function(res) {
                                    console.info('1111111', res)
                                    wx.redirectTo({
                                          url: '../purchase/purchase'
                                    })
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
      onLoad: function(options) {
            let self = this;
            self.setData({
                  Price: options.Price,
                  consignee: options.consignee,
                  sn: options.sn
            })
      }
})