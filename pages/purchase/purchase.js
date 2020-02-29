//index.js
//获取应用实例
const app = getApp()

Page({
      data: {
            bgUrl: "../images/25prec.png",
            imgUrl: "../images/nobag.png",
            purchaseResult:"",
            purchaseDesc:"",
            telphone:"400-800- 8866",
            telphoneShowHide: false
      },
      onLoad: function() {
            let self = this;
            if (app.globalData.nobag ){
                  self.setData({
                        imgUrl: "../images/nobag.png",
                        purchaseResult: '袋子没有了...',
                        purchaseDesc: '请联系管理员!'
                  })
            } else if (app.globalData.shopFaild) {
                  self.setData({
                        imgUrl: "../images/nobag.png",
                        purchaseResult: '购买失败...',
                        purchaseDesc: '请联系管理员!'
                  })
            }
            else if (app.globalData.success){
                  self.setData({
                        imgUrl: "../images/success.png",
                        purchaseResult: '购买成功!',
                        purchaseDesc: '感谢你为环保贡献一份力量!'
                  })
            }
            else if (app.globalData.shopping) {
                  self.setData({
                        imgUrl: "../images/selling.png",
                        purchaseResult: '购买中...',
                        purchaseDesc: '请稍等...'
                  })
            }
      }
})