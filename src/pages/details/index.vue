<template>
  <div class='bg-white padding-lr'>
    <view class='solid-bottom text-xl padding skeletons-rect'>
      <text class='text-black text-bold'>{{textList.title}}</text>
    </view>
    <view class='solid-bottom text-lg padding bg-grey radius skeletons-rect'
          v-show="textList.content_short">
      <text><text class='text-orange text-bold'>摘要 ：</text>{{textList.content_short}}</text>
    </view>
    <view class='solid-bottom text-lg padding skeletons-rect'
          v-html="textList.content"></view>
    <skeletons :is_capture_nodes="is_capture_nodes"
               :is_complete="is_complete"
               loading="music"
               block_animation="shine"
               selector="skeletons"
               background="#fff" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      textList: {},
      is_capture_nodes: false,
      is_complete: false,
    };
  },
  onLoad (options) {
    let id = options.id
    this.textList = {}
    this.getDetail(id)
  },
  methods: {
    getDetail (id) {
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getDetail', id: id, extract: 1 }
      }).then(res => {
        this.is_capture_nodes = true
        this.textList = res.result.home.data || '默认'
        this.is_complete = true
      }).catch(error => {
        this.is_complete = true
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url("~mpvue-wxparse/src/wxParse.css");
</style>
