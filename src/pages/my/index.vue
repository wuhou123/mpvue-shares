<template>
  <div class="page">
    <cu-custom
      bgColor="bg-white"
      titleText="我的"
    ></cu-custom>

    <!-- 顶部区域 -->
    <div
      @click="goProfile"
      class="top-card border-bottom-bold"
    >
      <div class="user-top-header">
        <div class="user-info-content">
          <div class="user-avatar">
            <img
              src="/static/images/avatar.png"
              alt=""
            />
          </div>
          <div class="user-info-text">
            <div class="name">{{accessToken?userInfo.cname:'点击登录'}}</div>
            <div class="dec">{{accessToken?'点击查看个人信息':''}}</div>
          </div>
        </div>
        <div class="icon-right link-right"></div>
      </div>
      <div class="user-position">
        <img
          src="/static/images/Role_Management.png"
          alt=""
        > {{roleName}}
      </div>
    </div>

    <!-- 菜单区域 -->
    <picker
      :disabled="customerList.length===1"
      :range="customerList"
      @change="changeCustomer"
      range-key="customerName"
    >
      <div
        class="menu-cell border-bottom-bold"
        @click="showAction"
      >
        <div class="menu-icon"><span class="iconfont icontab-my-Switch"></span></div>
        <div class="menu-content justify-between">
          <div class="cell-label">当前公司</div>
          <div class="cell-value text-cut">
            {{customerName}}
            <span
              v-if="customerList.length>1"
              class="icon-right"
            ></span>
          </div>
        </div>
      </div>
    </picker>

    <navigator
      url="/pages/notice"
      hover-class="none"
      class="menu-cell"
    >
      <div class="menu-icon"><span class="iconfont icontab-my-announcement"></span></div>
      <div class="menu-content solid-bottom">
        <div class="cell-label">公告通知</div>
        <div class="cell-value text-cut">
          <span class="icon-right"></span>
        </div>
      </div>
    </navigator>

    <div
      class="menu-cell"
      @click="phoneCall('4006199939')"
    >
      <div class="menu-icon"><span class="iconfont icontab-my-customer"></span></div>
      <div class="menu-content solid-bottom">
        <div class="cell-label">客服电话</div>
        <div class="cell-value text-cut">
          4006199939 <span class="icon-right"></span>
        </div>
      </div>
    </div>

    <!-- <div open-type="feedback"
         class="menu-cell">
      <div class="menu-icon"><span class="iconfont icontab-my-feedback"></span></div>
      <button open-type="feedback"
              class="cu-btn menu-content solid-bottom"
              style="border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);">
        <div class="cell-label">反馈问题</div>
        <div class="cell-value text-cut">
          <span class="icon-right"></span>
        </div>
      </button>
    </div> -->
    <!-- 吐个槽 -->
    <navigator
      class="menu-cell"
      target="miniProgram"
      open-type="navigate"
      app-id="wx8abaf00ee8c3202e"
      :extra-data="extraData"
      version="release"
    >
      <div class="menu-icon"><span class="iconfont icontab-my-feedback"></span></div>
      <div class="menu-content solid-bottom">
        <div class="cell-label">吐个槽</div>
        <div class="cell-value text-cut">
          吐槽有奖励<span class="icon-right"></span>
        </div>
      </div>
    </navigator>

    <navigator
      url="/pages/about"
      hover-class="none"
      class="menu-cell"
    >
      <div class="menu-icon"><span class="iconfont icontab-my-aboutus"></span></div>
      <div class="menu-content">
        <div class="cell-label">关于我们</div>
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
        id: '87751',
        customData: {
          clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
          imei: '7280BECE2FC29544172A2B858E9E90D0'
        }
      }
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken,
      userInfo: state => state.user.userInfo,
      roleName: state => state.user.roleName,
      customerList: state => state.user.customerList,
      customerId: state => state.user.customerId,
      customerName: state => state.user.customerName
    })
  },
  onShow() {
    if (this.accessToken) {
      this.initLoad()
    }
  },
  methods: {
    async initLoad() {
      await this.loadData()
      await this.getUserRoleList()
      await this.getUserCustomers()
    },
    async loadData() {
      const res = await this.$api.user.info()
      if (res && res.items) {
        this.userInfo = res.items
        this.$store.commit('user/setUserInfo', res.items)
      }
    },
    async getUserRoleList() {
      const res = await this.$api.user.getUserRoleList({
        userId: this.userInfo.userId
      })
      if (res && res.items) {
        const roleList = res.items.listHaveRole
        const list = roleList.filter(item => item.have)
        if (list.length) {
          this.roleName = list[0].name
          this.$store.commit('user/setRoleName', list[0].name)
        }
      }
    },
    async getUserCustomers() {
      const res = await this.$api.user.getUserCustomers({ customer_name: '' })
      if (res && res.items) {
        const items = res.items
        const customerId = this.customerId
        this.$store.commit('user/setCustomerList', items)
        if (!customerId) {
          const customer = items.find(item => item.defaultFlag === 1)
          if (customer) {
            this.storeCustomer(customer)
          } else {
            mpvue.showToast({
              title: '该账号未配置商家，请联系项目对接人开通！',
              icon: 'none'
            })
          }
        } else {
          const customer = items.find(item => item.customerId === customerId)
          this.storeCustomer(customer)
        }
      }
    },
    changeCustomer(e) {
      const value = Number(e.target.value)
      const customer = this.customerList.find((item, index) => index === value)
      this.storeCustomer(customer)
    },
    storeCustomer(customer) {
      const { customerName, customerId } = customer
      this.$store.commit('user/setCustomerId', customerId)
      this.$store.commit('user/setCustomerName', customerName)
    },
    // 跳转到个人页面
    goProfile() {
      // 没有登录跳转到登录页
      if (!this.accessToken) {
        let pages = getCurrentPages()
        this.$store.commit('SET_STORAGEPAGE', pages[0])
        mpvue.navigateTo({
          url: '/pages/login'
        })
        return
      }
      mpvue.navigateTo({ url: '/pages/profile' })
    },
    phoneCall(phone) {
      mpvue.makePhoneCall({
        phoneNumber: phone
      })
    }
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

