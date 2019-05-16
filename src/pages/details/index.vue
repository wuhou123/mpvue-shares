<template>
  <div class='bg-white padding-lr'>
    <view class='solid-bottom text-xl padding'
          v-show="textList.title">
      <text class='text-black text-bold'>{{textList.title}}</text>
    </view>
    <view class='solid-bottom text-lg padding bg-grey radius'
          v-show="textList.content_short">
      <text><text class='text-orange text-bold'>摘要 ：</text>{{textList.content_short}}</text>
    </view>
    <view class='solid-bottom text-lg padding css-color-red'
          v-html="textList.content"
          v-show="textList.content"></view>
    <view class="load-progress"
          :class="loadProgress!=0?'show':'hide'"
          :style="[{top:CustomBar+'px'}]">
      <view class="load-progress-bar bg-green"
            :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
      <view class="load-progress-spinner text-green"></view>
    </view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textList: {},
      is_capture_nodes: false,
      is_complete: false,
      CustomBar: 0,
      loadProgress: 0
    };
  },
  onLoad (options) {
    let id = options.id
    this.textList = {}
    if (options.type === 'banner') this.getBannerData(id)
    else this.getDetail(id)
  },
  methods: {
    getBannerData (index) {
      this.LoadProgress()
      const db = wx.cloud.database()
      const list = db.collection('notice')
      list.get().then(res => {
        this.loadProgress = 100
        this.textList = res.data[0].list[index] || []
      }).catch(error => console.log(error))
    },
    getDetail (id) {
      this.LoadProgress()
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getDetail', id: id, extract: 1 }
      }).then(res => {
        this.textList = res.result.home.data || '默认'
        this.textList.content = this.textList.content.replace(/\<img/gi, '<img style="width:100vw !important"')
        this.textList.content = this.textList.content.replace(/\<h2/gi, '<h2 style="font-size:18px"')
        this.loadProgress = 100
      }).catch(error => {
        console.log(error)
      })
    },
    LoadProgress (e) {
      this.loadProgress = this.loadProgress + 3;
      let timer;
      if (this.loadProgress < 100) {
        timer = setTimeout(() => {
          this.LoadProgress();
        }, 100)
      } else {
        clearTimeout(timer)
        this.loadProgress = 0;
      }
    }
  }
}
</script>

<style lang="less">
.css-color-red {
  line-height: 60rpx;
}
</style>
