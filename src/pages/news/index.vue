<template>
  <div class="container">
    <!-- 横向tab -->
    <scroll-view scroll-x
                 class="bg-white nav">
      <div class="flex text-center css-absolute">
        <div class="cu-item flex-sub"
             :class="index==TabCur?'text-orange cur':''"
             v-for="(item,index) in tabList"
             :key="index"
             @tap="tabSelect(index)">
          {{item}}
        </div>
      </div>
    </scroll-view>
    <!-- 推荐 -->
    <scroll-view scroll-y>
      <section v-show="TabCur===0||TabCur===1||TabCur===2">
        <div class="cu-card article no-card border-top"
             v-for="(item,index) in newsList[TabCur]"
             :key="index"
             @click="goDetail(item)">
          <div class="cu-item shadow">
            <div class="title">
              <div class="text-cut">{{item.resource.title}}</div>
            </div>
            <div class="content">
              <image :src="item.resource.image_uri"
                     lazy-load
                     mode="aspectFill"></image>
              <div class="desc">
                <div class="text-content">{{item.resource.content_short}}</div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </scroll-view>

    <!-- 日历 -->
    <section v-if="TabCur===3">
      <div class="cu-timeline"
           v-for="(item,index) in listData"
           :key="index">
        <div class="cu-time ">{{item.date}} {{item.week}}</div>
        <div class="cu-item text-blue icon-noticefill "
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
          <div class="cu-time ">{{initTime}}</div>
          <div class='cu-item text-red icon-attentionforbidfill '>
            <div class="content bg-red shadow-blur">
              当前正在生成数据中...
            </div>
          </div>
        </div>
      </section>
    </section>
    <!-- 直播 -->
    <section v-if="TabCur===4">
      <div class="cu-timeline"
           v-for="(item,index) in liveList"
           :key="index">
        <div class="cu-time width120">{{item.CreatedAt}}</div>
        <div class="cu-item text-grey">
          <div class="content bg-grey shadow-blur">
            {{item.Title}}
          </div>
          <div class="cu-tag bg-red light round margin-top"
               v-if="item.Stocks"
               @click="searchTo(item.Stocks[0].Symbol)">{{item.Stocks[0].Name}}</div>
        </div>
      </div>
    </section>
    <!-- loading -->
    <div class="cu-load load-modal"
         v-if="loadModal">
      <image src="/static/logo.png"
             mode="aspectFit"></image>
      <div class="gray-text">加载中...</div>
    </div>
  </div>
</template>

<script>
import Request from "@/api/allApi";
import { SET_LOGIN, SET_CODE, SET_USERINFO } from "../../store/mutation-types";
import { mapMutations } from "vuex";

export default {
  data () {
    return {
      TabCur: 0,
      tabList: ['推荐', '精选', '国内', '日历', '股市直播'],
      loadModal: false,
      newsList: [],
      listData: [],
      liveList: []
    }
  },

  methods: {
    ...mapMutations({
      setLogin: "SET_LOGIN",
      setCode: "SET_CODE",
      setUserInfo: "SET_USERINFO"
    }),
    onPageScroll () {
      console.log('111')
    },
    searchTo (item) {
      let id = item.split('.')[0]
      this.setCode(id)
      wx.switchTab({
        url: '../market/main'
      })
    },
    goTop () {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 45,
          duration: 0
        })
      }
    },
    getData () {
      if (this.listData && this.listData.length > 0) return
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getCalendar' }
      }).then(res => {
        let list = res.result.home
        if (list && list.includes('callback_dt')) list = JSON.parse(list.replace('callback_dt(', '').replace(');', ''))
        this.listData = this.fileterData(list) || []
      }).catch(error => {
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
      return result;
    },
    cardSwiper (e) {
      this.cardCur = e.mp.detail.current
    },
    tabSelect (index) {
      this.TabCur = index;
      this.scrollLeft = (index - 1) * 60
      if (this.TabCur == 3) this.getData()
      else if (this.TabCur == 4) this.getLives()
      else this.getNews()
    },
    getNews () {
      this.loadModal = true
      let types = ['wscn-free', 'most-read', 'enterprise']
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getNews', limit: 30, cursor: '', channel: types[this.TabCur], accept: 'article,newsroom,morning-report,newsrooms,live,calendar,audition,wits-home-users,hot-themes,vote-interactive,discuss-interactive,ad.internal_banner.inhouse,ad.internal_inline.inhouse,ad.inline.inhouse,ad.video.inhouse,ad.banner.inhouse,ad.inline.plista,ad.banner.plista,ad.topic.inhouse,ad.inline.tanx' }
      }).then(res => {
        this.loadModal = false
        let data = res.result.home.data.items || []
        this.newsList[this.TabCur] = data
        this.goTop()
      }).catch(error => {
        this.loadModal = false
      })
    },
    getLives () {
      this.loadModal = true
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getLives', limit: 20 }
      }).then(res => {
        this.loadModal = false
        let data = res.result.home.Messages || []
        this.liveList = data
        this.liveList.forEach(v => {
          v.CreatedAt = this.getTime(v.CreatedAt)
        })
        this.goTop()
      }).catch(error => {
        this.loadModal = false
      })
    },
    add0 (m) {
      return m < 10 ? '0' + m : m
    },
    getTime (time) {
      let date = parseInt(time) * 1000
      let dates = new Date(date)
      let hh = dates.getHours()
      let mm = dates.getMinutes()
      return `${this.add0(hh)}:${this.add0(mm)}`
    },
    goDetail (item) {
      let url = "../details/main?id=" + item.resource.id
      wx.navigateTo({ url })
    }
  },
  onLoad (pageConfig) {
    this.TabCur = parseInt(pageConfig.tabCur) || 0
    this.tabSelect(this.TabCur)
  },
  onPageScroll () {

  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
  background: #fff;
  padding-top: 90rpx;
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
.css-absolute {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 999;
}
.border-top {
  border-top: 1px solid #e8e8e8;
}
.cu-timeline .cu-time.width120 {
  width: 120rpx;
}
</style>
