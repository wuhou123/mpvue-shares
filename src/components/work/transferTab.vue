<template>
  <section class="addr-content">
    <section style="padding:60rpx 0;">
      <ul class="addr-ul animation-fade"
          @click="goAddress('transfersSend')">
        <li class="addr-main text-cut">{{sendName?'':'选择始发仓'}}</li>
        <li class="addr-sub fontSize-18 text-cut">{{sendName||'始发仓'}}</li>
      </ul>
      <img src="../../../static/images/rotateTransfer.png"
           mode="aspectFill"
           class="addr-img">
      <ul class="addr-ul animation-fade"
          @click="goAddress('transferReceive')">
        <li class="addr-main text-cut">{{receiveName?'':'选择目的仓'}}</li>
        <li class="addr-sub fontSize-18 text-cut">{{receiveName||'目的仓'}}</li>
      </ul>
    </section>
    <button class="cu-btn round bg-green search-btn"
            @click="search">搜索</button>
  </section>
</template>

<script>
export default {
  name: 'transferTab',
  data () {
    return {
      type: 'transfersSend'
    }
  },
  computed: {
    warehouseObj () {
      return this.$store.state.storageWarehouse
    },
    sendName () {
      return this.warehouseObj['transfersSend'] && this.warehouseObj['transfersSend'].warehouseName
    },
    receiveName () {
      return this.warehouseObj['transferReceive'] && this.warehouseObj['transferReceive'].warehouseName
    }
  },
  onLoad () {},
  methods: {
    goAddress (type) {
      this.type = type
      let id = this.warehouseObj[this.type] ? this.warehouseObj[this.type].warehouseId : ''
      mpvue.navigateTo({ url: `/pages/wareHouseSearch?id=${id}&type=${type}` })
    },
    search () {
      if (!this.sendName || !this.receiveName) return mpvue.showToast({ icon: 'none', title: '请选择始发和目的仓库' })
      mpvue.navigateTo({ url: `/pages/work/transfer?warehouseObj=${JSON.stringify(this.warehouseObj)}` })
    }
  }
}
</script>

<style lang="less" scoped>
.addr-content {
  height: 374rpx;
  background: #fff;
  margin: 0 20rpx;
  border-radius: 0 0 8rpx 8rpx;
  .addr-ul {
    min-width: 162rpx;
    display: block;
    height: 100rpx;
    border-bottom: 1px solid #979797;
    text-align: left;
    float: left;
    margin-left: 36rpx;
    &:last-of-type {
      float: right;
      text-align: right;
      margin-left: 0;
      margin-right: 36rpx;
    }
    .addr-main {
      width: 250rpx;
      height: 40rpx;
      color: #a4a4a8;
    }
    .addr-sub {
      width: 250rpx;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
    }
  }
  .addr-img {
    width: 88rpx;
    height: 88rpx;
  }
}
</style>