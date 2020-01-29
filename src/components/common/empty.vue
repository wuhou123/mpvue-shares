<template>
  <div class="result-list-empty-text">
    <div class="result-empty result-empty-normal">
      <img class="result-empty-image"
           :alt="description"
           :src="image"
           mode="aspectFill">
      <p class="result-empty-description">{{description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    description: {
      type: String,
      required: false,
      default: '暂无数据'
    },
    image: {
      type: String,
      required: false,
      default: '/static/images/empty.png'
    }
  }
}
</script>

<style lang="less" scoped>
.result-list-empty-text {
  padding: 32rpx;
  color: rgba(0, 0, 0, 0.25);
  font-size: 28rpx;
  text-align: center;
}
.result-empty {
  font-size: 28rpx;
  line-height: 44rpx;
  text-align: center;
}
.result-empty-normal {
  margin-top: 320rpx;
  color: rgba(0, 0, 0, 0.25);
}
.result-empty-image {
  display: block;
  margin: 0 auto 34rpx auto;
  width: 274rpx;
  height: 185rpx;
}
.result-empty-description {
  margin: 0;
  font-size: 24rpx;
  color: #909090;
}
</style>
