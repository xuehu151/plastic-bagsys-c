//index.js
//获取应用实例
let app = getApp();
import requestUrl from '../../utils/util.js'

Page({
      data: {
            defaultSize: 'default',
            imgUrl: "../images/bag.png",
            loading: false
      },
      //事件处理函数
      FreeCollection: function() {
            // this.setData({
            //       loading: !this.data.loading
            // })
            wx.navigateTo({
                  url: '../purchase/purchase'
            })
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: (options) => {
            wx.getSetting({
                  success: (res) => {
                        if (res.authSetting['scope.userInfo']) { //授权了，可以获取用户信息了
                              wx.getUserInfo({
                                    success: (res) => {
                                          app.globalData.userInfo = res.userInfo;
                                    }
                              })
                        } else {
                              wx.redirectTo({
                                    url: '../authorize/authorize', //授权页面
                              })
                        }
                  }
            })
            requestUrl.requestUrl({
                        url: "biz/device/infoByCode/LDA10001",
                        params: {},
                        method: "get",
                  })
                  .then((data) => { 
                        console.log("允许授权了");
                  })
                  .catch((errorMsg) => {
                        console.log(errorMsg)
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