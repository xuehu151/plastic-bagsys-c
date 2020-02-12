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
            let self =  this;
            requestUrl.requestUrl({
                  url: "biz/pay/add",
                  params: {
                        orderSn: self.data.sn,
                        payMethod: 1
                  },
                  method: "post",
            }).then(function (res) {
                  console.info(res)
                  // wx.requestPayment({
                  //       'timeStamp': '',
                  //       'nonceStr': '',
                  //       'package': '',
                  //       'paySign': '',
                  //       'signType': 'MD5',
                  //       'success': function (res) { 
                  //             console.info('1111111',res)
                  //       },
                  //       'fail': function (res) {
                  //             console.info('22222222', res)
                  //        },
                  //       'complete': function (res) { 
                  //             console.info('33333333', res)
                  //       }
                  // })
            })
                  .catch((errorMsg) => {
                        //error
                  })
            // wx.requestPayment({
            //       'timeStamp': '',
            //       'nonceStr': '',
            //       'package': '',
            //       'signType': 'MD5',
            //       'paySign': '',
            //       'success': function(res) {},
            //       'fail': function(res) {},
            //       'complete': function(res) {}
            // })
      },
      onLoad: function(options) {
            let self = this;
            console.info(options)
            self.setData({
                  Price: options.Price,
                  consignee: options.consignee,
                  sn: options.sn
            })
      }
})