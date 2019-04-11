<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  }
}
</script>

<style lang="less">
@import "../static/css/icon.css";
@import "../static/css/colorui.css";
page {
  background: #f7f8f9;
}
.wxParse p {
  margin-top: 0 !important;
}
</style>
