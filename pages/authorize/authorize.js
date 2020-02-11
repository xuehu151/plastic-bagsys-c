// pages/authorize/authorize.js
import requestUrl from '../../utils/util.js'
var globalOpenId = getApp().globalData.openId;

Page({
      /**
       * 页面的初始数据
       */
      data: {
            canIUse: wx.canIUse('button.open-type.getUserInfo')
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {

      },
      bindGetUserInfo: function(e) {
            if (e.detail.userInfo) {
                  var that = this;
                  wx.navigateTo({
                        url: '../in-purchase/in-purchase'
                  })
            }
      }
})