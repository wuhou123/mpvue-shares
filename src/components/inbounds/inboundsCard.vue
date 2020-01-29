<template>
  <section class="inbounds-config">
      <div class="bg-white mt20" v-for="(item,index) in cardList" :key="index">
        <div class="cu-bar">
          <div class="action">
            <span class="icon-text text-green order-span"></span>
            <text class="text-bold ml10" selectable='true'>{{item.reference || '-'}}</text>
          </div>
        </div>
        <div class="product-div text-666" @click="goDetail(item)">
          <div class="prd-flex">
            <span>{{orderTypes[item.orderTypeId] || ''}}</span>
            <span>{{item.warehouseName}}</span>
            <span>{{item.poItems[0].productShortName}}等{{item.poItems.length}}个品类</span>
          </div>
          <div><span class='cu-tag light round' :class="bgTypes[item.status]">{{item.statusText}}</span></div>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  name: 'inboundsCard',
  props: ['cardList'],
  data() {
    return {
      bgTypes: {
        BEGIN: 'bg-blue',
        AUDIT: 'bg-red',
        CONFIRM: 'bg-green',
        PART_FINISH: 'bg-yellow',
        FINISH: 'bg-olive'
      },
      orderTypes: {
        '10002': '采购入库单',
        '10003': '退货入库单'
      }
    }
  },
  methods: {
    goDetail(item) {
      mpvue.navigateTo({
        url: `/pages/work/inboundsDetail?item=${JSON.stringify(item)}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.product-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 20rpx 0;
  margin: 0 35rpx;
  background: #fff;
  border-top: 1rpx solid #f1f1f1;
  line-height: 60rpx;
  .prd-flex {
    width: calc(100% - 110rpx);
    display: flex;
    flex-direction: column;
  }
}
.order-span {
  width: 50rpx;
  height: 50rpx;
  line-height: 50rpx;
  border-radius: 50%;
  background: rgba(236, 247, 231, 1);
  text-align: center;
}
</style>