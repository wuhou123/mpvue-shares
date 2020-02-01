<template>
  <div class="page">
    <cu-custom
      bgColor="bg-white"
      :isBack="true"
      titleText="关于"
    ></cu-custom>
    <div class="footer-dec">
      <div class="text-df text-666 text-content margin-bottom-sm">
        <text selectable='true'>关爱疫情，关爱他人，早日抗战胜利！</text>
        <div selectable='true'>初始版本，加紧更新！</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    phoneCall(phone) {
      mpvue.makePhoneCall({
        phoneNumber: phone
      })
    },
    copyText(e) {
      let text = e.currentTarget.dataset.text
      wx.setClipboardData({
        data: text,
        success: function(res) {
          wx.getClipboardData({
            success: function(res) {
              wx.showToast({
                title: '复制成功'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.page {
  height: 100vh;
  background-color: #fff;
}
.app-logo {
  display: block;
  margin: 180rpx auto 13rpx auto;
  width: 180rpx;
  height: 180rpx;
}
.app-title {
  font-size: 44rpx;
  color: #29b87a;
  text-align: center;
  margin-bottom: 12rpx;
}
.app-version {
  font-size: 30rpx;
  color: #606060;
  text-align: center;
}
.footer-dec {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  padding: 0 60rpx;
  .txt {
    font-size: 26rpx;
    color: #b2b2b2;
  }
}
</style>

