<template>
<div class="cu-modal" :class="{'show':showModal,'bottom-modal':type==='timeLine'}" @tap="close">
    <div class="cu-dialog">
      <div class="cu-bar bg-white" v-if="type==='timeLine'">
        <div class="action text-green"></div>
        <div class="action icon-roundclose fontSize-28 text-ccc" @tap="close"></div>
      </div>
      <!-- 时间轴 -->
      <div class="cu-timeline" v-if="type==='timeLine'">
        <div class="cu-time">{{dayData}}</div>
        <div class="cu-item cur" v-for="(item,index) in listData" :key="index" :class="{'text-green icon-roundcheckfill':index===0}">
          <div class="content bg-white">
            <text :class="{'content-bold':index===0}">{{item.flowText}}</text>
            <p class="text-000">{{item.operationTimeText || ''}}</p>
          </div>
        </div>
      </div>
      <div class="bg-white" v-else>
        <p class="fontSize-18 content-bold texts-center moreProduct-title text-cut" v-if="moreData[0]">{{moreData[0].productShortName}}</p>
        <div class="product-div" v-for="(items,indexs) in moreData" :key="indexs">
          <p class="fontSize-14 content-888 notice-title" v-for="(item,index) in tabList" :key="index">
            <span class="content-888">{{item.label}}</span>
            <span>{{items[item.id]||''}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatTime} from '@/utils'

export default {
  name: 'inboundsModal',
  props: ['showModal', 'type', 'listData', 'moreData'],
  data () {
    return {
      dayData: '',
      tabList: [{
        label: '生产日期：',
        id: 'productDate'
      }, {
        label: '到期日期：',
        id: 'expiryDate'
      }, {
        label: '批次号：',
        id: 'batchCode'
      }, {
        label: '入库：',
        id: 'realQty'
      }]
    }
  },
  watch: {
    showModal (val) {
      if (val && this.type === 'timeLine') this.dayData = formatTime(this.listData[0].operationTimeText).slice(5, 10)
    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="less" scoped>
.cu-timeline > .cu-item > .content{
  display:flex;
  justify-content: space-between;
  padding-top:8rpx;
  background:none;
  text-align:left
}
.product-div{
  display:flex;
  align-items:center;
  width:100%;
  height:150rpx;
  background:#FBFBFB;
  margin-bottom:25rpx;
  flex-wrap:wrap;
  padding: 20rpx 25rpx;
  .notice-title{
    display:flex;
    width:50%;
    align-items:center
  }
}
.moreProduct-title{
  height:116rpx;
  line-height:116rpx;
  border-bottom:1px solid #F1F1F1;
  margin-bottom:50rpx
}
</style>