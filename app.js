//app.js
import requestUrl from './utils/util.js';

App({
      onLaunch: function (options)  {            
      },
      globalData: {
            userInfo: null,
            success: false,
            nobag: false,
            shopping: false,
            shopFaild: false,
            deviceError: false
      }
})