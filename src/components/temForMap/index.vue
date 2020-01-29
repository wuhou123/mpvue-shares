<template>
    <view class="temForMap-container">
        <map id="map" :longitude="longitude" :latitude="latitude" :polyline="polyline" :markers="localMarker" enable-overlooking="true" class="amap-class">
        </map>
        <cover-view class="tmpBtn" @click="goTrack">查看温度轨迹 >
        </cover-view>
    </view>
</template>
<script>
import {getRote} from '@/utils'
// import testPoints from './test'

export default {
  name: 'temForMap',
  props: ['linesData', 'lineItem'],
  data () {
    return {
      markerIndex: -1,
      latitude: 0,
      longitude: 0,
      playTrajectory: '',
      localMarker: [{
        iconPath: '/static/images/map/Oval.png',
        id: 0,
        latitude: 22,
        longitude: 113,
        width: 11,
        height: 11,
        anchor: {x: 0.5, y: 0.5},
        callout: {
          content: '寄',
          color: '#fff',
          bgColor: '#000',
          display: 'ALWAYS',
          padding: 10,
          borderRadius: 5
        }
      }, {
        iconPath: '/static/images/map/Oval.png',
        id: 1,
        latitude: 0,
        longitude: 0,
        width: 11,
        height: 11,
        anchor: {x: 0.5, y: 0.5},
        callout: {
          content: '运输中',
          color: '#666',
          bgColor: '#fff',
          display: 'ALWAYS',
          padding: 10,
          borderRadius: 5
        }
      }, {
        iconPath: '/static/images/map/car.png',
        id: 2,
        latitude: 0,
        longitude: 0,
        width: 40,
        height: 20,
        anchor: {x: 0.5, y: 0.5},
        zIndex: 2
      }],
      polyline: [{
        points: [],
        color: '#2db5a5',
        width: 5,
        arrowLine: true
      }],
      mapCtx: '',
      staticPoints: [],
      runPoints: []
    }
  },
  onLoad () {
    this.mapCtx = this.mapCtx || wx.createMapContext('map')
  },
  onReady () {
    this.searchTrajectory()
  },
  onUnload () {
    // 初始化参数
    this.polyline = [{
      points: [],
      color: '#2db5a5',
      width: 5,
      arrowLine: true
    }]
    this.runPoints = []
    this.staticPoints = []
    this.markerIndex = -1
    this.playTrajectory = ''
  },
  onShow () {
    this.includePoints()
  },
  onHide () {
    clearTimeout(this.playTrajectory)
  },
  methods: {
    goTrack () {
      mpvue.navigateTo({url: `/pages/searchDetail/searchTmpMap?lineItem=${JSON.stringify(this.lineItem)}`})
    },
    searchTrajectory () {
      if (!this.linesData || !this.linesData.position.trackInfos) return
      // 过滤数据点
      this.filterPoints()
      // 视野
      this.includePoints()
      // 中心点
      this.setCenterPoints()
      // 轨迹回放
      this.play()
    },
    filterPoints () {
      let item = this.linesData.position.trackInfos[0].gpsTempList || []
      this.staticPoints = []
      this.runPoints = []
      item.map((v, i) => {
        if (item[i + 1]) {
          let deg = getRote(v.longitude, v.latitude, item[i + 1].longitude, item[i + 1].latitude)
          let longitude = item[i + 1].longitude
          let latitude = item[i + 1].latitude
          if (deg) this.staticPoints.push({longitude, latitude})
          if (deg > 180 && deg < 270) this.runPoints.push({longitude, latitude})
        }
      })
      let polyline = this.polyline[0].points = this.staticPoints
      this.localMarker[0].latitude = this.localMarker[2].latitude = polyline[0].latitude
      this.localMarker[0].longitude = this.localMarker[2].longitude = polyline[0].longitude
      this.localMarker[1].latitude = polyline[polyline.length - 1].latitude
      this.localMarker[1].longitude = polyline[polyline.length - 1].longitude
    },
    setTranslateMarker ({longitude, latitude}) {
      if (!longitude || !latitude) return
      this.mapCtx.translateMarker({
        markerId: 2,
        autoRotate: true,
        duration: 500,
        destination: {
          latitude: latitude,
          longitude: longitude
        }
      })
    },
    play () {
      let show = () => {
        this.playTrajectory = setTimeout(() => {
          this.markerIndex++
          let position = this.runPoints[this.markerIndex] || {}
          this.setTranslateMarker(position)
          if (this.markerIndex < this.runPoints.length) {
            show()
          } else {
            this.markerIndex = 0
            this.isPlayNow = false
          }
        }, 500)
      }
      if (this.isPlayNow) {
        clearTimeout(this.playTrajectory)
      } else {
        show()
      }
      this.isPlayNow = !this.isPlayNow
    },
    includePoints () {
      if (!this.mapCtx) return
      let that = this
      this.mapCtx.includePoints({
        padding: [50],
        points: that.polyline[0].points
      })
    },
    setCenterPoints () {
      let that = this
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: res => {
          let {latitude, longitude} = res
          that.latitude = latitude || ''
          that.longitude = longitude || ''
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.temForMap-container{
  position:absolute;
  top:60;
  left:0;
  width:100%;
  .amap-class{
    width:100%;
    height:550rpx
  }
  .tmpBtn{
    position:absolute;
    bottom:25rpx;
    right:40rpx;
    width:220rpx;
    height:50rpx;
    padding:4rpx 10rpx;
    color:#fff;
    background:rgba(0,0,0,0.6);
    border-radius:4px;
    text-align:center;
    line-height:50rpx
  }
}
</style>
