<template>
  <div
    class="cu-modal bottom-modal"
    :class="{'show':showModal}"
    @tap="close"
  >
    <div class="cu-dialog">
      <div class="cu-bar bg-white">
        <div class="action text-green"></div>
        <div
          class="action icon-roundclose fontSize-28 text-ccc"
          @tap="close"
        ></div>
      </div>
      <!-- 时间轴 -->
      <div class="cu-timeline">
        <div class="cu-time">{{dayData}}</div>
        <div
          class="cu-item cur"
          v-for="(item,index) in listData"
          :key="index"
          :class="{'text-green icon-roundcheckfill':index===0}"
        >
          <div class="content bg-white">
            <text :class="{'content-bold':index===0}">{{item.title}}</text>
            <p class="text-000">{{item.time || ''}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils'

export default {
  name: 'incrementModal',
  props: ['showModal', 'listData'],
  data() {
    return {
      dayData: ''
    }
  },
  watch: {
    showModal(val) {
      this.dayData = this.listData[0].time
        ? formatTime(this.listData[0].time).slice(5, 10)
        : '-'
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="less" scoped>
.cu-timeline > .cu-item > .content {
  display: flex;
  justify-content: space-between;
  padding-top: 8rpx;
  background: none;
  text-align: left;
}
.product-div {
  display: flex;
  align-items: center;
  width: 100%;
  height: 150rpx;
  background: #fbfbfb;
  margin-bottom: 25rpx;
  flex-wrap: wrap;
  padding: 20rpx 25rpx;
  .notice-title {
    display: flex;
    width: 50%;
    align-items: center;
  }
}
.moreProduct-title {
  height: 116rpx;
  line-height: 116rpx;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 50rpx;
}
</style>