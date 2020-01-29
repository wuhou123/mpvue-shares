<template>
    <div class="margin-top-lg" @click="toDetail">
        <div class="notice-item-time">{{publishTime}}</div>
        <div class="cu-card bg-white padding-lr margin-top">
            <div class="cu-bar bg-white solid-bottom">
                <div class="action text-df text-black margin-0">
                    <span class="notice-icon-out">
                        <span class="iconfont icontab-my-announcement"></span>
                    </span>
                    系统公告
                </div>
                <div class="action text-df text-gray margin-0">查看详情
                    <i class="icon-right"></i>
                </div>
            </div>
            <div class="padding-tb">
                <div class="text-lg text-black text-bold margin-bottom-xs text-cut">{{data.title}}</div>
                <div class="text-sm text-df notice-intro" v-if="data.type === '1'">{{textContent}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {formatTime} from '@/utils/format'
export default {
  name: 'noticeItem',
  props: ['data'],
  data () {
    return {}
  },
  computed: {
    textContent () {
      const { content = '', type } = this.data
      if (type === '1') {
        return this.getContent(content)
      } else {
        return ''
      }
    },
    publishTime () {
      const { publishTime = '' } = this.data
      return formatTime(publishTime)
    }
  },
  methods: {
    getContent (val) {
      if (!val) return
      let re1 = new RegExp('<.+?>', 'g')
      let msg = val.replace(/\n/g, '').replace(re1, '').replace(/&nbsp;/g, '')
      return msg
    },
    toDetail () {
      const {id, type, url, title} = this.data
      // 公告阅读
      // this.$api.notice.updatePageview({id})
      this.$store.dispatch('notice/countView', id)
      if (type === '1') {
        mpvue.navigateTo({
          url: `/pages/notice/detail?id=${id}&title=${title}`
        })
      } else if (type === '0') {
        mpvue.navigateTo({
          url: `/pages/webview?url=${url}`
        })
      } else {
        mpvue.navigateTo({
          url: `/pages/notice/detail?id=${id}&title=${title}`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.margin-0{
  margin: 0 !important;
}
.notice-item-time{
  margin: 0 auto;
  width: 220rpx;
  height: 36rpx;
  line-height: 36rpx;
  text-align: center;
  background-color: #DCDCDC;
  font-size: 22rpx;
  color: #fff;
  border-radius: 18rpx;
}
.notice-icon-out{
  display: inline-block;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  text-align: center;
  line-height: 50rpx;
  background-color: #ECF7E7;
  margin-right: 20rpx;
  .iconfont{
    color: #29B87A;
    font-size: 28rpx;
  }
}
.notice-intro{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
