<template>
  <div class="page">
    <cu-custom
      bgColor="bg-white"
      titleText="我的"
    ></cu-custom>

    <!-- 顶部区域 -->
    <div
      @click="goProfile"
      class="top-card"
    >
      <div class="user-top-header">
        <div class="user-info-content">
          <div class="user-avatar">
            <!-- <img
              src="/static/images/avatar.png"
              alt=""
            /> -->
            <open-data type='userAvatarUrl' />
          </div>
                  <div class="user-info-text">
              
            <open-data type='userNickName'
                   lang="zh_CN"
                   class="name" />

        </div>
        </div>

        <div class="icon-right link-right"></div>
      </div>
    </div>

    <!-- 菜单区域 -->
    <!-- 吐个槽 -->
    <navigator
      class="menu-cell"
      target="miniProgram"
      open-type="navigate"
      app-id="wx8abaf00ee8c3202e"
      :extra-data="extraData"
      version="release"
    >
      <div class="menu-icon"><span class="icon-edit"></span></div>
      <div class="menu-content solid-bottom">
        <div class="cell-label">吐个槽</div>
        <div class="cell-value text-cut">
          <span class="icon-right"></span>
        </div>
      </div>
    </navigator>

    <navigator
      url="/pages/about"
      hover-class="none"
      class="menu-cell"
    >
      <div class="menu-icon"><span class="icon-cascades"></span></div>
      <div class="menu-content">
        <div class="cell-label">关于</div>
        <div class="cell-value text-cut">
          <span class="icon-right"></span>
        </div>
      </div>
    </navigator>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      extraData: {
        id: '121132',
        customData: {
          clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
          imei: '123'
        }
      }
    }
  },
  computed: {},
  onShow() {},
  methods: {
    async initLoad() {
      await this.loadData()
      await this.getUserRoleList()
      await this.getUserCustomers()
    },
    async loadData() {},
    async getUserRoleList() {},
    async getUserCustomers() {},
    changeCustomer(e) {},
    storeCustomer(customer) {},
    // 跳转到个人页面
    goProfile() {},
    phoneCall(phone) {}
  }
}
</script>

<style scoped lang="less">
.page {
  height: 100vh;
  background-color: #f8f8f8;
}

.top-card {
  padding: 43rpx 32rpx 0 60rpx;
  background-color: #fff;
}
.user-top-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30rpx;
  border-bottom: 1rpx solid #e4e5e6;
  .user-info-content {
    display: flex;
    align-items: center;
    .user-avatar {
      width: 108rpx;
      height: 108rpx;
      overflow: hidden;
      border-radius: 50%;
      background-color: #ddd;
      & > img {
        width: 108rpx;
        height: 108rpx;
      }
    }
    .user-info-text {
      margin-left: 20rpx;
      .name {
        font-size: 34rpx;
        color: #0f0f0f;
        font-weight: bold;
        margin-bottom: 5rpx;
      }
      .dec {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
  .link-right {
    padding-bottom: 20rpx;
    align-self: flex-end;
  }
}
.user-position {
  padding: 12rpx 0;
  font-size: 26rpx;
  color: #999;
  & > img {
    width: 28rpx;
    height: 28rpx;
    vertical-align: middle;
  }
}
.menu-cell {
  display: flex;
  align-items: center;
  padding-left: 60rpx;
  background-color: #fff;
  border: 0;
  border-radius: 0;
  .menu-content {
    height: 108rpx;
    padding: 34rpx 0;
    flex: auto;
    display: flex;
    justify-content: space-between;
    padding-left: 30rpx;
    background-color: #fff;
    border-radius: 0;
  }
  .cell-label {
    font-size: 30rpx;
    color: #0f0f0f;
    font-weight: bold;
  }
  .cell-value {
    flex-shrink: 0;
    font-size: 26rpx;
    color: #909090;
    padding-right: 32rpx;
  }
}
.border-bottom-bold {
  border-bottom: 12rpx solid #f8f8f8;
}
</style>

