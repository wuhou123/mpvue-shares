<template>
  <div class="container skeletons">
    <swiper class="card-swiper square-dot skeletons-rect"
            indicator-dots="true"
            circular="true"
            autoplay="true"
            interval="5000"
            duration="500"
            @change="cardSwiper"
            indicator-color="#8799a3"
            indicator-active-color="#0081ff">
      <swiper-item v-for="(item,index) in imgList"
                   :key="index"
                   :class="cardCur==index?'cur':''">
        <!-- <view class='bg-img shadow-blur'
              :style="{'background-image':imgList[index]}"></view> -->
        <img :src="item"
             class='bg-img shadow-blur'
             alt="">
      </swiper-item>
    </swiper>
    <!-- 横向tab -->
    <scroll-view scroll-x
                 class="bg-white nav css-sticky">
      <view class="flex text-center skeletons-rect">
        <view class="cu-item flex-sub"
              :class="index==TabCur?'text-orange cur':''"
              v-for="(item,index) in tabList"
              :key="index"
              @tap="tabSelect"
              :data-id="index">
          {{item}}
        </view>
      </view>
    </scroll-view>
    <!-- 推荐 -->
    <section v-if="TabCur===0||TabCur===1">
      <view class="cu-card article no-card border-top"
            v-for="(item,index) in newsList[TabCur]"
            :key="index"
            @click="goDetail(item)">
        <view class="cu-item shadow">
          <view class="title">
            <view class="text-cut">{{item.resource.title}}</view>
          </view>
          <view class="content">
            <image :src="item.resource.image_uri"
                   mode="aspectFill"></image>
            <view class="desc">
              <view class="text-content">{{item.resource.content_short}}</view>
              <view>
                <!-- <view class="cu-tag bg-red light sm round">{{item.resource.display_time}}</view> -->
              </view>
            </view>
          </view>
        </view>
      </view>
    </section>
    <!-- 日历 -->
    <section v-if="TabCur===2">
      <div class="cu-timeline"
           v-for="(item,index) in listData"
           :key="index">
        <div class="cu-time skeletons-rect">{{item.date}} {{item.week}}</div>
        <div class="cu-item text-blue icon-noticefill skeletons-rect"
             v-for="(sign,sindex) in item.events"
             :key="sindex">
          <div class="content">
            <div class="cu-capsule radius">
              <div class="cu-tag bg-cyan">事件</div>
              <div class="cu-tag line-cyan">{{sign.event}}</div>
            </div>
            <div class='margin-top'>
              <div class="cu-tag bg-red">影响板块</div>
              <div class="cu-tag line-red">{{sign.concepts||'影响股较多'}}</div>
            </div>
          </div>
        </div>
      </div>
      <section class="noData"
               v-if="listData&&listData.length===0">
        <div class="cu-timeline">
          <div class="cu-time skeletons-rect">{{initTime}}</div>
          <div class='cu-item text-red icon-attentionforbidfill skeletons-rect'>
            <div class="content bg-red shadow-blur">
              当前正在生成数据中...
            </div>
          </div>
        </div>
      </section>
    </section>

    <skeletons :is_capture_nodes="is_capture_nodes"
               :is_complete="is_complete"
               loading="music"
               block_animation="shine"
               selector="skeletons"
               background="#fff" />
  </div>
</template>

<script>
import Request from "@/api/allApi";
import { SET_LOGIN, SET_CODE, SET_USERINFO } from "../../store/mutation-types";
import { mapMutations } from "vuex";
import { formatTime } from "@/utils/index"

export default {
  data () {
    return {
      is_capture_nodes: false,
      is_complete: false,
      listData: [],
      cardCur: 0,
      imgList: [],
      initTime: '',
      tabList: ['推荐', '精选', '日历'],
      TabCur: 0,
      scrollLeft: 0,
      newsList: []
    }
  },

  methods: {
    ...mapMutations({
      setLogin: "SET_LOGIN",
      setCode: "SET_CODE",
      setUserInfo: "SET_USERINFO"
    }),
    getBanner () {
      const db = wx.cloud.database()
      const banner = db.collection('banner')
      banner.get().then(res => {
        console.log(res.data[0].list)
        this.imgList = res.data[0].list || []
      })
    },
    getData () {
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getCalendar' }
      }).then(res => {
        this.is_capture_nodes = true
        let list = res.result.home
        if (list && list.includes('callback_dt')) list = JSON.parse(list.replace('callback_dt(', '').replace(');', ''))
        console.log('getData', list)
        this.listData = this.fileterData(list) || []
        this.is_complete = true
        //无数据时
        console.log('this.listData', this.listData.length)
        this.initTime = formatTime(new Date())
      }).catch(error => {
        this.is_complete = true
        console.log(error)
      })
    },
    fileterData (tmpJSON) {
      let result = [];
      if (tmpJSON.stat != "ok") return result;
      for (let i = 0; i < tmpJSON.data.length; i++) {
        let calendarInfo = { "date": "", "week": "", "events": [] };
        calendarInfo.date = tmpJSON.data[i].date;
        calendarInfo.week = tmpJSON.data[i].week;

        for (let j = 0; j < tmpJSON.data[i].events.length; j++) {
          let eventInfo = { "event": "", "concepts": "", "stocks": "", code: '' };

          eventInfo.event = tmpJSON.data[i].events[j][0].length > 19 ? tmpJSON.data[i].events[j][0].substr(0, 18) + '...' : tmpJSON.data[i].events[j][0];
          for (let k = 0; k < tmpJSON.data[i].concept[j].length; k++) { eventInfo.concepts += tmpJSON.data[i].concept[j][k].name + " "; eventInfo.code += tmpJSON.data[i].concept[j][k].code + " " }
          for (let k = 0; k < tmpJSON.data[i].field[j].length; k++) { eventInfo.concepts += tmpJSON.data[i].field[j][k].name + " "; }  // concept和field合一
          for (let k = 0; k < tmpJSON.data[i].stocks[j].length; k++) { eventInfo.stocks += tmpJSON.data[i].stocks[j][k].name + " "; }
          calendarInfo.events.push(eventInfo);
        }
        result.push(calendarInfo);
      }
      console.log('filter', result)
      return result;
    },
    cardSwiper (e) {
      this.cardCur = e.mp.detail.current
    },
    tabSelect (e) {
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
      if (this.TabCur == 2) this.getData()
      else this.getNews()
    },
    getNews () {
      if (this.newsList[this.TabCur]) return
      this.is_capture_nodes = false
      this.is_complete = false
      let types = ['wscn-free', 'most-read']
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getNews', limit: 20, cursor: '', channel: types[this.TabCur], accept: 'article,newsroom,morning-report,newsrooms,live,calendar,audition,wits-home-users,hot-themes,vote-interactive,discuss-interactive,ad.internal_banner.inhouse,ad.internal_inline.inhouse,ad.inline.inhouse,ad.video.inhouse,ad.banner.inhouse,ad.inline.plista,ad.banner.plista,ad.topic.inhouse,ad.inline.tanx' }
      }).then(res => {
        this.is_capture_nodes = true
        let data = res.result.home.data.items || []
        // data.forEach(v => {
        //   let date = parseInt(v.resource.display_time)
        //   v = formatTime(new Date(date))        })
        this.newsList[this.TabCur] = data
        this.is_complete = true
        console.log('ressss', res)
      }).catch(error => {
        this.is_complete = true
        console.log(error)
      })
    },
    goDetail (item) {
      console.log(item.resource.id)
      let url = "../details/main?id=" + item.resource.id
      wx.navigateTo({ url })
    }
  },
  onLoad () {
    this.getBanner()
    this.getNews()
  },
  onShow () { },

  async onPullDownRefresh () { },

  // 上拉加载，拉到底部触发
  onReachBottom () { }
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.author {
  width: 200rpx;
  height: 200rpx;
  line-height: 200rpx;
  border-radius: 100%;
  background: #111;
  margin: 30rpx auto;
  font-size: 32rpx;
  text-align: center;
  color: #fff;
}
.cu-timeline .cu-time {
  width: 300rpx;
}
.container .card-swiper swiper-item {
  padding: 10rpx 0rpx 0rpx;
}
.noData {
  height: calc(100vh - 420rpx);
  background: #fff;
}
.css-sticky {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 999;
}
.border-top {
  border-top: 1px solid #e8e8e8;
}
</style>
