<template>
  <div class="data-config">
    <cu-custom
      bgColor="bg-white"
      titleText="首页"
    ></cu-custom>
    <section class="order-data">
      <div class="data-title fontSize-20">全国概况</div>
      <ul class="data-ul">
        <li class="data-li">
          <p class="mb15 fontSize-18 font-DIN text-red">{{workData.confirmedCount || ''}}</p>
          <p>确诊病例</p>
        </li>
        <li class="data-li">
          <p class="mb15 fontSize-18 font-DIN text-orange">{{workData.suspectedCount || ''}}</p>
          <p>疑似病例</p>
        </li>
        <li
          class="data-li"
        >
          <p class="mb15 fontSize-18 content-bold font-DIN">{{workData.deadCount || ''}}</p>
          <p>死亡病例</p>
        </li>
        <li class="order-total font-DIN data-li">
          <p class="fontSize-24 text-green">
            {{workData.curedCount || ''}}
          </p>
          <p class="text-green fontSize-18">治愈</p>
        </li>
      </ul>
      <div class="cu-progress round xs">
        <div
          class="bg-green transition"
          :style="[{ width:setWidth}]"
        ></div>
      </div>
    </section>
    <!-- 公告 -->
    <section class="data-notice">
      <ul class="data-ul">
        <li class="data-item">
          <p class="text-blue">{{addrName}}</p>
        </li>
        <li>
          <div class="mb10 flex text-p">
          <div class="cu-capsule">
            <div class='cu-tag bg-red'>
              确诊
            </div>
            <div class="cu-tag line-red">
              {{citysData.confirmedCount || '--'}}
            </div>
          </div>
                    <div class="cu-capsule">
            <div class='cu-tag bg-orange'>
              疑似
            </div>
            <div class="cu-tag line-orange">
               {{citysData.suspectedCount || '--'}}
            </div>
          </div>
          </div>
          <div class="flex text-p">
            <div class="cu-capsule">
            <div class='cu-tag bg-grey'>
              死亡
            </div>
            <div class="cu-tag line-grey">
              {{citysData.deadCount || '--'}}
            </div>
          </div>
                    <div class="cu-capsule">
            <div class='cu-tag bg-green'>
              治愈
            </div>
            <div class="cu-tag line-green">
              {{citysData.curedCount || '--'}}
            </div>
          </div>
          </div>
        </li>
      </ul>
    </section>
    <!-- 单量统计 -->
    <section
      class="order-charts"
      v-show="!showModal"
    >
      <div class="data-title fontSize-20">新增趋势</div>
    </section>
    <div class="echarts-wrap">
      <mpvue-echarts
        :echarts="echarts"
        :onInit="onInit"
        canvasId="demo-canvas"
      />
    </div>
    <section class="order-data">
      <div class="data-title fontSize-20">省市数据</div>
      			<!-- <view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="icon-title text-orange"></text> 国内
				</view>
			</view> -->
			<div class="cu-list menu" v-for="(item,index) in listData" :key="index">
				<div class="cu-item bg-gray" :class="item.cities?'arrow':''" @click="changeStauts(item,index)">
					<div class="content flex">
						<text class="text-black with50 text-cut">{{item.provinceShortName}}</text>
            <text class="with50 text-red">{{item.confirmedCount}}</text>
            <text class="with50 text-orange">{{item.suspectedCount}}</text>
            <text class="with50 text-black">{{item.deadCount}}</text>
            <text class="with50 text-green">{{item.curedCount}}</text>
					</div>
				</div>
        <div class="cu-item" v-for="(val,valIndex) in item.cities" :key="valIndex" v-if="item.status">
          <div class="content flex">
						<text class="text-grey with50 text-cut">{{val.cityName}}</text>
            <text class="with50 text-red">{{val.confirmedCount}}</text>
            <text class="with50 text-orange">{{val.suspectedCount}}</text>
            <text class="with50 text-black">{{val.deadCount}}</text>
            <text class="with50 text-green">{{val.curedCount}}</text>
					</div>
        </div>

			</div>
    </section>
  </div>
</template>

<script>
import * as echarts from '../../../static/js/echarts.min'
import mpvueEcharts from 'mpvue-echarts'
import QQMapWX from '../../../static/js/qqmap-wx-jssdk.min.js'

// echarts init
let chart = null
let option = {
  grid: {
    x: 10,
    y: 10,
    x2: 10,
    y2: 20
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: function(params) {
      if (!params[0] || !params[0].axisValue) return '暂无数据'
      let data1 = params[0]
      let data2 = params[1]
      return `${data1.axisValue}\n确诊：${data1.value}\n疑似：${data2.value}`
    },
    position: function(point, params, dom, rect, size) {
      let x = 0 // x坐标位置
      let y = 0 // y坐标位置
      // 当前鼠标位置
      let pointX = point[0]
      let pointY = point[1]

      // 提示框大小
      let boxWidth = size.contentSize[0]
      let boxHeight = size.contentSize[1]

      // boxWidth > pointX 说明鼠标左边放不下提示框
      if (boxWidth > pointX) {
        x = 5
      } else {
        // 左边放的下
        x = pointX - boxWidth
      }

      // boxHeight > pointY 说明鼠标上边放不下提示框
      if (boxHeight > pointY) {
        y = 5
      } else {
        y = pointY - boxHeight
      }
      return [x, y]
    }
  },
  xAxis: {
    type: 'category',
    triggerEvent: true,
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#606060'
    },
    data: []
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line',
      symbol: 'circle',
      symbolSize: 5,
      color: '#e54d42',
      lineStyle: {
        color: '#e54d42'
      },
      itemStyle: {
        color: '#e54d42',
        borderWidth: 1,
        borderColor: '#FFF'
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#e54d42'
            },
            {
              offset: 1,
              color: '#e6f8f7'
            }
          ])
        }
      }
    },
    {
      data: [],
      type: 'line',
      symbol: 'circle',
      symbolSize: 5,
      color: '#FFBE53',
      lineStyle: {
        color: '#FFBE53'
      },
      itemStyle: {
        color: '#FFBE53',
        borderWidth: 1,
        borderColor: '#FFF'
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FFBE53'
            },
            {
              offset: 1,
              color: '#e6f8f7'
            }
          ])
        }
      }
    }
  ]
}

function initChart(canvas, width, height) {
  // echarts
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  chart.setOption(option)
  return chart
}
export default {
  name: 'data',
  components: {
    mpvueEcharts
  },
  data() {
    return {
      workData: {},
      citysData: {},
      listData: [],
      showModal: false,
      onInit: initChart,
      echarts,
      setWidth: '0%',
      xdatas: [],
      chart: '',
      isRepact: false,
      qqmapsdk: '',
      addrName: ''
    }
  },
  onLoad() {
    if (!this.qqmapsdk) {
      this.qqmapsdk = new QQMapWX({
        key: '4ZEBZ-PKLCF-2DZJH-NJARG-M4DDF-QNF4C'
      })
      this.getLocation()
    }
  },
  methods: {
    getLocation() {
      wx.getLocation({
        success: res => {
          this.getAddr(res.latitude, res.longitude)
        },
        fail: error => {
          console.log('error', error)
        }
      })
    },
    getAddr(latitude, longitude) {
      this.qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: res => {
          let data = res.result.ad_info || {}
          this.addrName = data.city.replace('市', '')
          console.log('city', data)
        }
      })
    },
    changeStauts(item, index) {
      console.log(item, index)
      item.status = !item.status
    },
    changeList(index) {
      this.btnIndex = index
      this.getList()
    },
    getList() {
      this.xdatas = []
      this.isRepact = true
      let params = {
        data: {
          key: '2587807a9f638ba5a1e72c998019331b'
        }
      }
      this.$api.getData
        .ncovIndex(params)
        .then(res => {
          console.log('res1', res)
          //测试数据
          this.workData = res.newslist[0].desc || ''
          this.setWidth =
            this.workData.curedCount / this.workData.confirmedCount * 100 + '%'
          //趋势数据
          this.setInit(res.newslist[0].case || [])
        })
        .catch(error => console.log(error))
      //测试城市数据
      this.$api.getData
        .ncovcity(params)
        .then(res => {
          this.setCityInit(res.newslist || [])
        })
        .catch(error => console.log(error))
    },
    getCityData(cityData) {
      let cityArray = cityData || []
      cityArray.forEach(v => {
        v.status = false
        if (v.provinceShortName === this.addrName) return (this.citysData = v)
        if (v.cities && v.cities.length > 0) {
          v.cities.forEach(val => {
            if (val.cityName === this.addrName) this.citysData = val
          })
        }
      })
      this.listData = cityArray
    },
    getNotice() {},
    getWorkFinish() {},
    clickNotice() {},
    openModal() {},
    async getUserCustomers() {},
    initMethods(dataJson) {
      let caseData = dataJson || []
      let xdata1 = []
      let xdata2 = []
      caseData.forEach(v => {
        option.xAxis.data.push(v.provinceShortName)
        xdata1.push(v.confirmedCount)
        xdata2.push(v.suspectedCount)
      })
      option.series[0].data = xdata1
      option.series[1].data = xdata2
      chart.setOption(option)
    },
    setInit(dataJson) {
      if (chart) this.initMethods(dataJson)
      else {
        setTimeout(() => {
          if (chart) this.initMethods(dataJson)
          else this.setInit(dataJson)
        }, 100)
      }
    },
    setCityInit(cityData) {
      if (this.addrName) this.getCityData(cityData)
      else {
        setTimeout(() => {
          if (this.addrName) this.getCityData(cityData)
          else this.setCityInit(cityData)
        }, 100)
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.data-config {
  height: 100vh;
  background: #fff;
}
.order-data {
  background: #fff;
  padding: 30rpx 40rpx;
}
.data-ul {
  height: 120rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  .data-li {
    width: 25%;
    padding: 0 22rpx;
    text-align: center;
    border-right: 1px solid #dedede;
  }
  .order-total {
    border-right: none;
  }
  .data-item {
    width: 100rpx;
    padding: 0 20rpx;
    margin-right: 22rpx;
    text-align: center;
    border-right: 1px solid #dedede;
  }
  .right-li {
    width: auto;
  }
  .text-p {
    width: 450rpx;
    justify-content: space-between;
  }
}
.data-title {
  font-weight: 600;
  margin-bottom: 30rpx;
}
.data-notice {
  padding: 0 58rpx;
  background: #fff;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
}
.order-charts {
  padding: 40rpx;
  background: #fff;
  position: relative;
  .date-btn {
    width: 240rpx;
    height: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 50rpx;
    right: 50rpx;
    .active {
      color: #0f0f0f;
      border-bottom: 3px solid #ffbe53;
      font-weight: 600;
      border-radius: 3rpx;
    }
  }
}
.echarts-wrap {
  width: 100%;
  height: 400rpx;
}
.transition {
  transition: all 2s;
}
.notice-title {
  padding: 12rpx 0;
  margin-bottom: 20rpx;
}
.icon-right {
  padding: 10rpx;
}
.cu-modal {
  text-align: inherit;
}
.cu-dialog {
  margin-left: calc(50% - 340rpx);
}
.with50 {
  width: 20%;
}
.cu-list.menu > .cu-item {
  background: #f0f0f0;
}
.cu-capsule {
  width: 200rpx;
}
</style>
