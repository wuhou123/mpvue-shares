<template>
  <section class="addr-content">
    <section style="padding:60rpx 0;">
      <ul class="addr-ul animation-fade"
          @click="goAddress('expressSend')">
        <li class="addr-main text-cut">{{warehouseName?'':'选择始发仓'}}</li>
        <li class="addr-sub fontSize-18 text-cut">{{warehouseName||'始发仓'}}</li>
      </ul>
      <img src="../../../static/images/rotate2.png"
           mode="aspectFill"
           class="addr-img">
      <ul class="addr-ul animation-fade"
          @click="goAddress('receive')">
        <li class="addr-main text-cut">{{receive[2]&&receive[0]?receive[0]+'/':''}} {{receive[2]?receive[1]:receive[0]||'选择到达地'}}</li>
        <li class="addr-sub fontSize-18 text-cut">{{receive[2]||receive[1]||'到达地'}}</li>
      </ul>
    </section>
    <button class="cu-btn round bg-green search-btn"
            @click="search">搜索</button>
  </section>
</template>

<script>
export default {
  data () {
    return {
      receive: ['', '', '']
    }
  },
  computed: {
    warehouseObj () {
      return this.$store.state.storageWarehouse
    },
    warehouseId () {
      return this.warehouseObj['expressSend'] && this.warehouseObj['expressSend'].warehouseId
    },
    warehouseName () {
      return this.warehouseObj['expressSend'] && this.warehouseObj['expressSend'].warehouseName
    }
  },
  onLoad () {
    this.receive = this.$store.state.selectDeliveryAreas || []
  },
  methods: {
    goAddress (type) {
      if (type === 'expressSend') {
        mpvue.navigateTo({ url: `/pages/wareHouseSearch?id=${this.warehouseId}&type=${type}` })
      } else {
        mpvue.navigateTo({ url: `/pages/address/district` })
      }
    },
    search () {
      const warehouseId = this.warehouseId
      const warehouseName = this.warehouseName
      const [receiveProvince, receiveCity, receiveDistrict] = this.receive
      if (!warehouseId && !receiveDistrict) {
        mpvue.showToast({ icon: 'none', title: '请选择始发仓和目的地' })
      } else if (!warehouseId) {
        mpvue.showToast({ icon: 'none', title: '请选择始发仓库' })
      } else if (!receiveDistrict) {
        mpvue.showToast({ icon: 'none', title: '请选择目的地' })
      } else {
        mpvue.navigateTo({ url: `/pages/express?warehouseId=${warehouseId}&warehouseName=${warehouseName}&receiveProvince=${receiveProvince}&receiveCity=${receiveCity}&receiveDistrict=${receiveDistrict}` })
      }
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