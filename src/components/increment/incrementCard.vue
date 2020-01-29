<template>
  <section class="incrementCard-config">
    <div
      class="bg-white mt20"
      v-for="(item,index) in cardList"
      :key="index"
    >
      <div class="cu-bar">
        <div class="action">
          <span class="icon-text text-green order-span"></span>
          <text
            class="text-bold ml10"
            selectable='true'
          >{{item.payNo || '-'}}</text>
        </div>
      </div>
      <div
        class="product-div text-666"
        @click="goDetail(item)"
      >
        <div class="prd-flex">
          <span class="text-cut">
            <span class="content-888">增值类目</span>
            {{item.firstCategoryName}}/{{item.secondCategoryName}}</span>
          <span>
            <span class="content-888">服务仓库</span>
            {{item.warehouseName}}</span>
          <span>
            <span class="content-888">作废状态</span>
            {{['未作废','已作废'][item.delFlag]}}
          </span>
          <span>
            <span class="content-888">计划数量</span>
            {{item.planQty}} {{item.unit}}
          </span>
        </div>
        <div><span
            class='cu-tag light round'
            :class="bgTypes[item.status]"
          >{{stautsTypes[item.status]}}</span></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'incrementCard',
  props: ['cardList'],
  data() {
    return {
      bgTypes: {
        UN_CONFIRM: 'bg-red',
        CONFIRM: 'bg-blue',
        IN_EXECUTION: 'bg-yellow',
        FINISH: 'bg-green',
        CANCELLED: 'bg-olive'
      },
      stautsTypes: {
        UN_CONFIRM: '未确认',
        CONFIRM: '已确认',
        IN_EXECUTION: '作业中',
        FINISH: '已完成',
        CANCELLED: '已作废'
      }
    }
  },
  methods: {
    goDetail(item) {
      mpvue.navigateTo({
        url: `/pages/work/incrementDetail?item=${JSON.stringify(item)}`
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