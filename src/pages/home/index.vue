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
            indicator-active-color="#0081ff"
            v-show="is_complete&&imgList.length!==3">
      <swiper-item v-for="(item,index) in imgList"
                   :key="index"
                   :class="cardCur==index?'cur':''">
        <!-- <div class='bg-img shadow-blur'
              :style="{'background-image':imgList[index]}"></div> -->
        <image :src="item"
               class='bg-img shadow-blur set-bg'
               :class="'set-bg'+index"
               alt=""
               mode="aspectFit"
               @click="goBanner(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 横向tab -->
    <scroll-view scroll-x
                 class="bg-white nav css-sticky"
                 v-show="is_complete&&imgList.length!==3">
      <div class="flex text-center skeletons-rect">
        <div class="cu-item flex-sub"
             :class="index==TabCur?'text-orange cur':''"
             v-for="(item,index) in tabList"
             :key="index"
             @tap="tabSelect"
             :data-id="index">
          {{item}}
        </div>
      </div>
    </scroll-view>
    <!-- 推荐 -->
    <section v-if="imgList.length!==3">
      <div class="cu-card article no-card border-top skeletons-rect"
           v-for="(item,index) in newsList"
           :key="index"
           @click="goDetail(item)">
        <div class="cu-item shadow">
          <div class="title">
            <div class="text-cut">{{item.resource.title}}</div>
          </div>
          <div class="content">
            <image :src="item.resource.show?item.resource.image_uri:'https://image.weilanwl.com/gif/wave.gif'"
                   :class="[item.resource.show?'active':'','imgItem'+index]"
                   mode="aspectFill"></image>
            <div class="desc">
              <div class="text-content">{{item.resource.content_short}}</div>
              <div>
                <!-- <div class="cu-tag bg-red light sm round">{{item.resource.display_time}}</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class='icon-title text-blue'></text>今日
        </view>
      </view>
      <view class="grid col-3 padding-sm">
      </view>
      <view class='dailyForecast'>
        <view v-for="(item,index) in futureWeather"
              style="display: block;"
              :key="index">
          <view class='daily'
                style="flex-direction:row;">
            <view class='dailyDate'>{{item.date}}</view>
            <image class='dailyImg'
                   :src='item.dayPictureUrl'
                   mode='aspectFit' />
            <view class='dailyCond'>{{item.weather}}</view>
            <view class='dailyTmp'>{{item.temperature}}</view>
          </view>
        </view>
      </view>
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
import Request from "@/api/allApi"
import bmap from '@/utils/bmap-wx.min.js'

export default {
  data () {
    return {
      futureWeather: [],
      ColorList: [{
        title: '黄金价格',
        name: 'red',
        color: '#e54d42',
        value: '287.2'
      },
      {
        title: '港币汇率',
        name: 'orange',
        color: '#f37b1d',
        value: '0.8809'
      },
      {
        title: '深圳房价',
        name: 'olive',
        color: '#8dc63f',
        value: '58563'
      }],
      dateData: [],
      is_capture_nodes: false,
      is_complete: false,
      listData: [],
      cardCur: 0,
      imgList: [],
      initTime: '',
      tabList: ['推荐', '精选', '国内', '日历', '股市直播'],
      TabCur: 0,
      scrollLeft: 0,
      newsList: [{ resource: '' }, { resource: '' }, { resource: '' }, { resource: '' }, { resource: '' }, { resource: '' }],
    }

  },

  methods: {
    goBanner (index) {
      if (this.imgList.length === 3) return
      this.goDetail(index, 'banner')
    },
    getBanner () {
      const db = wx.cloud.database()
      const banner = db.collection('banner')
      this.is_capture_nodes = true
      banner.get().then(res => {
        this.imgList = res.data[0].list || []
        if (this.imgList.length === 3) this.loadWeather()
        this.is_complete = true
      }).catch(error => this.is_complete = true)
    },
    cardSwiper (e) {
      this.cardCur = e.mp.detail.current
    },
    tabSelect (e) {
      if (e.currentTarget.dataset.id != 0) {
        let url = "../news/main?tabCur=" + e.currentTarget.dataset.id
        wx.navigateTo({ url })
        return
      }
      this.TabCur = e.currentTarget.dataset.id;

    },
    getNews () {
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getNews', limit: 20, cursor: '', channel: 'wscn-free', accept: 'article,newsroom,morning-report,newsrooms,live,calendar,audition,wits-home-users,hot-themes,vote-interactive,discuss-interactive,ad.internal_banner.inhouse,ad.internal_inline.inhouse,ad.inline.inhouse,ad.video.inhouse,ad.banner.inhouse,ad.inline.plista,ad.banner.plista,ad.topic.inhouse,ad.inline.tanx' }
      }).then(res => {
        let data = res.result.home.data.items || []
        this.newsList = data
        this.newsList.forEach((v, i) => v.resource.show = i <= 1)
        //图片懒加载
        this.getLazyImg()
      }).catch(error => {
        console.log(error)
      })
    },
    goDetail (item, type) {
      let url;
      if (type === 'banner') {
        url = `../details/main?type=${type}&id=${item}`
      } else url = "../details/main?id=" + item.resource.id
      wx.navigateTo({ url })
    },
    getLazyImg () {
      setTimeout(() => {
        for (let i in this.newsList) {
          let className = `.imgItem${i}`
          wx.createIntersectionObserver().relativeToViewport({ bottom: 20 }).observe(className, (result) => {
            // console.log(className)
            if (result.intersectionRatio > 0) {
              this.newsList[i].resource.show = true
            }
          })
        }
      }, 2000)
    },
    loadWeather () {
      let _this = this
      // 新建百度地图对象
      let BMap = new bmap({
        ak: 'gGpLpLOSIGme81xiRacyTc5VWxfY3Gka'
      })
      let fail = function (data) {
        console.log(data)
      }
      let success = function (data) {
        console.log('jinru', data)
        let futureWeather = data.originalData.results[0].weather_data
        _this.futureWeather = futureWeather
        _this.futureWeather[0].date = '今天'
      }
      // 发起weather请求
      BMap.weather({
        fail: fail,
        success: success
      })
      BMap.regeocoding({
        fail: function (res) {
          console.log(res)
        },
        success: function (res) { }
      })
    }
  },
  onLoad () {
    this.getBanner()
    this.getNews()
  }
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
  height: 100%;
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
.content {
  image {
    transition: all 0.3s ease;
    opacity: 0.3;
  }
  .active {
    opacity: 1;
  }
}
.set-bg0 {
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
}
.set-bg1 {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
}
//天气
.daily {
  display: flex;
  align-items: center;
  height: 80rpx;
  background-color: white;
  text-align: center;
}
.dailyDate {
  text-align: left;
  width: 25%;
  color: #4b4b4b;
  font-size: 30rpx;
  margin-left: 5%;
}
.dailyImg {
  margin-left: 100rpx;
  margin-right: 40rpx;
  width: 64rpx;
  height: 80%;
}
.dailyCond {
  text-align: left;
  width: 40%;
  color: #4b4b4b;
  font-size: 30rpx;
}
.dailyTmp {
  text-align: center;
  width: 40%;
  font-size: 30rpx;
  font-family: "PingFangSC-Semibold";
}
</style>
