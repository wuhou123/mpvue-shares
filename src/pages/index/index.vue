<template>
  <div class="data-config">
    <cu-custom
      bgColor="bg-white"
      titleText="统计"
    ></cu-custom>
    <section class="order-data">
      <div class="data-title fontSize-20">今日订单</div>
      <ul class="data-ul">
        <li class="data-li">
          <p class="mb15 fontSize-18 content-bold font-DIN">{{workData.planOut || 0}}</p>
          <p>计划出库</p>
        </li>
        <li class="data-li">
          <p class="mb15 fontSize-18 content-bold font-DIN">{{workData.finishOut || 0}}</p>
          <p>已出库</p>
        </li>
        <li
          class="data-li"
          style="border-right:none"
        >
          <p class="mb15 fontSize-18 content-bold font-DIN">{{workData.unFinish || 0}}</p>
          <p>未出库</p>
        </li>
        <li class="order-total font-DIN">
          <span class="fontSize-50 text-green">
            <numberGrow :value="setValue"></numberGrow>
          </span>
          <span class="text-green fontSize-18">%</span>
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
          <p class="text-green">系统</p>
          <p class="text-green">公告</p>
        </li>
        <li
          @click="clickNotice"
          v-show="noticeData.title"
        >
          <p class="mb15 fontSize-16 content-bold text-cut text-p">{{noticeData.title}}</p>
          <p class="text-606">发布时间：{{noticeData.publishTime}}</p>
        </li>
        <li
          class="order-total right-li"
          @click="clickNotice"
        >
          <span class="icon-right"></span>
        </li>
      </ul>
    </section>
    <!-- 单量统计 -->
    <section
      class="order-charts"
      v-show="!showModal"
    >
      <div class="data-title fontSize-20">单量统计</div>
      <ul class="date-btn">
        <li
          :class="btnIndex==index?'active':''"
          v-for="(item,index) in dateList"
          @click="changeList(index)"
          :key="index"
        >{{item}}天</li>
      </ul>
    </section>
    <div
      class="echarts-wrap"
      v-show="!showModal"
    >
      <mpvue-echarts
        :echarts="echarts"
        :onInit="onInit"
        canvasId="demo-canvas"
      />
    </div>
    <!-- 公告弹框 -->
    <div
      class="cu-modal"
      :class="showModal?'show':''"
    >
      <div class="cu-dialog">
        <div class="padding-xl bg-white">
          <p class="fontSize-18 content-bold texts-center">{{noticeData.title}}</p>
          <p class="fontSize-14 content-888 border-bottom notice-title texts-center">发布时间：{{noticeData.publishTime}}</p>
          <div style="max-height:530rpx;overflow:auto">
            <p v-html="noticeData.content"></p>
          </div>
        </div>
        <div class="cu-bar bg-white">
          <div
            class="action margin-0 flex-sub"
            @tap="showModal=false"
          >
            <button class="cu-btn round line-green">我知道了</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from '../../../static/js/echarts.min'
import mpvueEcharts from 'mpvue-echarts'
import numberGrow from '@/components/common/numberGrow'
import { formatTime } from '@/utils'
import $config from '@/config'
const { ACCESS_TOKEN } = $config

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
      params = params[0]
      return params.axisValue + ' : ' + params.value
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
      data: [1],
      type: 'line',
      symbol: 'circle',
      symbolSize: 5,
      color: '#019885',
      lineStyle: {
        color: '#019885'
      },
      itemStyle: {
        color: '#4FD0C7',
        borderWidth: 1,
        borderColor: '#FFF'
      },
      label: {
        show: false,
        position: 'top',
        textStyle: {
          color: '#019885',
          fontSize: 12
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#019885'
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
    mpvueEcharts,
    numberGrow
  },
  data() {
    return {
      workData: {},
      noticeData: {},
      setValue: 0,
      dateList: [7, 15, 30],
      btnIndex: 0,
      showModal: false,
      onInit: initChart,
      echarts,
      setWidth: '0%',
      times: [],
      xdatas: [],
      chart: '',
      isRepact: false,
      hitDate: 0
    }
  },

  methods: {
    changeList(index) {
      this.btnIndex = index
      this.getList()
    },
    getList() {
      if (this.isRepact) return
      let preDate =
        +new Date() - 3600 * 24 * this.dateList[this.btnIndex] * 1000
      let nextDate = +new Date() - 3600 * 24 * 1 * 1000
      let params = {
        data: {
          customerId: this.$store.state.user.customerId,
          beginTime: formatTime(preDate, 'YYYY-MM-DD'),
          endTime: formatTime(nextDate, 'YYYY-MM-DD')
        }
      }
      this.times = []
      this.xdatas = []
      this.isRepact = true
      mpvue.showToast({ icon: 'loading', title: '加载图表中...' })
      this.$api.getData
        .trend(params)
        .then(res => {
          mpvue.hideLoading()
          this.isRepact = false
          let data = res.items || []
          data.forEach(v => {
            this.times.push(v.totalqty)
            this.xdatas.push(formatTime(v.cretime, 'MM.DD'))
          })
          option.series[0].data = this.times
          option.xAxis.data = this.xdatas
          chart.setOption(option)
        })
        .catch(error => {
          this.isRepact = false
          mpvue.hideLoading()
          console.log(error)
        })
    },
    getNotice() {
      let params = {
        data: {}
      }
      this.$api.getData
        .queryNoticeByCache(params)
        .then(res => {
          if (res.items) {
            this.noticeData = JSON.parse(res.items[0])[0]
            this.noticeData.publishTime = formatTime(
              this.noticeData.publishTime,
              'YYYY-MM-DD'
            )
            // 公告是否展示
            if (
              this.noticeData.publishTime ===
              formatTime(new Date(), 'YYYY-MM-DD')
            )
              this.openModal()
          }
        })
        .catch(error => console.log(error))
    },
    getWorkFinish() {
      let params = {
        data: {
          customerId: this.$store.state.user.customerId
        }
      }
      this.workData = {}
      this.setValue = 0
      this.setWidth = '0%'
      this.$api.getData
        .workFinish(params)
        .then(res => {
          this.workData = res.items || {}
          this.workData.unFinish =
            this.workData.planOut - this.workData.finishOut
          this.setValue =
            Math.round(this.workData.finishOut / this.workData.planOut * 100) ||
            0
          this.setWidth = `${this.setValue}%`
        })
        .catch(error => console.log(error))
    },
    clickNotice() {
      // 防抖
      let cureDate = +new Date() - this.hitDate
      this.hitDate = +new Date()
      if (cureDate < 300) return
      mpvue.navigateTo({ url: '/pages/notice' })
    },
    openModal() {
      if (this.noticeData.type === '1') {
        let readId = wx.getStorageSync('readId')
        if (readId !== this.noticeData.id) {
          setTimeout(() => {
            this.noticeData.content = this.noticeData.content
              .replace(/<img/gi, '<img style="max-width:100%;height:auto" ')
              .replace(
                /<table/gi,
                '<table style="border: solid 1px #999;border-collapse: separate;border-spacing: 1px;margin: 0 auto;empty-cells: hide;" '
              )
              .replace(
                /<td/gi,
                '<td style="border:1px solid #999;padding:5px" '
              )
            this.showModal = true
          }, 3000)
          wx.setStorageSync('readId', this.noticeData.id)
        }
      }
    },
    async getUserCustomers() {
      const res = await this.$api.user.getUserCustomers({ customer_name: '' })
      if (res.code === 'SUCCESS') {
        const items = res.items
        this.companyList = items
        const company = items.find(item => item.defaultFlag === 1)
        if (company) {
          this.$store.commit('user/setCustomerId', company.customerId)
          this.getList()
          this.getNotice()
          this.getWorkFinish()
        } else
          mpvue.showToast({
            title: '该账号未配置商家，请联系管理员',
            icon: 'none'
          })
      }
    },
    initMethods() {},
    setInit() {
      if (chart) this.initMethods()
      else {
        setTimeout(() => {
          if (chart) this.initMethods()
          else this.setInit()
        }, 100)
      }
    }
  },
  onShow() {
    // echarts dom加载问题
    this.setInit()
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
  .order-total {
    width: 190rpx;
    text-align: right;
    margin-left: auto;
  }
  .data-li {
    width: 160rpx;
    padding: 0 22rpx;
    text-align: center;
    border-right: 1px solid #dedede;
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
</style>
