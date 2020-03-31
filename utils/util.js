/* 公共request 方法 */
const requestUrl = ({
  url,
  params,
  method = "post",
  success
}) => {
  wx.showLoading({
    title: '加载中',
  });
  let server = 'https://minapp.qudaiji.com/'; //正式域名
  let token = wx.getStorageSync("token"),
    that = this;
  if (token != "" && token != null) {
    var header = {
      'content-type': 'application/json',
      'X-Auth-Token': token
    }
  } else {
    var header = {
      'content-type': 'application/json'
    }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: server + url,
      method: method,
      data: params,
      header: header,
      success: (res) => {
        wx.hideLoading();
        if (res['statusCode'] == 200) {
          resolve(res)
        } else {
          wx.showToast({
            title: res.data.msg || '请求出错',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          reject(res.ErrorMsg);
        }
      },
      fail: (res) => {
        wx.hideLoading();
        // wx.showToast({
        //       title: res.data.msg || '',
        //       icon: 'none',
        //       duration: 2000,
        //       mask: true
        // })
        reject('网络出错');
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  })
}
module.exports = {
  requestUrl: requestUrl
}