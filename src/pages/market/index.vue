<template>
  <div class="marketConfig skeletons">
    <scroll-view scroll-x
                 class="bg-set nav text-center skeletons-rect">
      <div class="cu-item"
           :class="0==TabCur?'text-white cur':''"
           @tap='tabSelect(0)'
           data-id="0"
           v-if="imgList.length!==3">
        <text class='icon-newsfill css-color-e8'></text> 沪深概况
      </div>
      <div class="cu-item"
           :class="1==TabCur?'text-white cur':''"
           @tap='tabSelect(1)'
           data-id="1"
           v-if="imgList.length!==3">
        <text class='icon-rank css-color-e8'></text> 排行榜
      </div>
      <div class="cu-item"
           :class="2==TabCur?'text-white cur':''"
           @tap='tabSelect(2)'
           data-id="2">
        <text class='icon-servicefill css-color-e8'></text> 查询
      </div>
    </scroll-view>
    <!-- 概况 -->
    <section v-show="TabCur==0">
      <div class="cu-bar bg-white solid-bottom skeletons-rect">
        <div class='action'>
          <p class='icon-titles text-orange '></p> 概况
        </div>
      </div>
      <div class='nav-list margin-top'
           v-if="TabCur==0">
        <div class="nav-li skeletons-rect"
             :class="item.bg || ''"
             v-for="(item,index) in elements"
             :key="index">
          <div class="nav-title"
               v-if="index==0">涨：{{dataList.zdfb_data.znum}}家</div>
          <div class="nav-title"
               v-else-if="index==1">涨停：{{dataList.zdt_data.last_zdt.ztzs}}支</div>
          <div class="nav-title"
               v-else-if="index==2">昨日涨停</div>
          <div class="nav-name"
               v-if="index==0">跌：{{dataList.zdfb_data.dnum}}家</div>
          <div class="nav-name"
               v-else-if="index==1">跌停：{{dataList.zdt_data.last_zdt.dtzs}}支</div>
          <div class="nav-name"
               v-else-if="index==2">今日收益:{{dataList.jrbx_data.last_zdf}}%</div>
          <text :class="item.iconfont"></text>
        </div>
      </div>
      <!-- 对比 -->
      <view class="padding"
            style="padding-top:0">
        <!-- <view class="cu-progress radius striped active">
          <span>涨</span>
          <view class="bg-red"
                :style="{width:addRate+'%'}">{{addRate}}%</view>
          <view class="bg-green"
                :style="{width:reduceRate+'%'}">{{reduceRate}}%</view>
          <span>跌</span>
        </view> -->
        <div class="echarts-wrap skeletons-rect">
          <mpvue-echarts :echarts="echarts"
                         :onInit="onInit"
                         canvasId="demo-canvas" />
        </div>
      </view>
    </section>
    <!-- 排行 -->
    <section v-show="TabCur==1">
      <swiper class="screen-swiper round-dot"
              :indicator-dots="true"
              :circular="true"
              :autoplay="false">
        <swiper-item v-for="(item,index) in rank.page"
                     :key="index">
          <ul class="rank-ul">
            <li class="rank-li"
                v-for="(sign,sindex) in rank.listIndex[index]"
                :key="sindex">
              <p class="rank-title">{{sign.sSecName}}</p>
              <div class="num-div">
                <div :class="sign.riceStatus?'c-red':'c-green'"><span :class="sign.riceStatus?'icon-triangleupfill':'icon-triangledownfill'"></span>{{sign.fNow}}</div>
                <span :class="sign.riceStatus?'c-red':'c-green'">{{sign.riceStatus?'+':''}}{{sign.rice}}</span>
                <span :class="sign.rateStatus?'c-red':'c-green'">{{sign.rateStatus?'+':''}}{{sign.rate}}%</span>
              </div>
            </li>
          </ul>
        </swiper-item>
      </swiper>
      <section v-for="(listItem,listIndex) in resultList"
               :key="listIndex">
        <view class="cu-bar bg-white solid-bottom margin-top">
          <view class="action">
            <text class="icon-title text-orange"></text> {{nameList[listIndex]}}
          </view>
        </view>
        <view class="cu-list menu text-left solid-top"
              v-for="(item,index) in listItem"
              :key="index">
          <view class="cu-item">
            <view class="content padding-tb-sm">
              <view>
                <text class="icon-tagfill margin-right-xs"
                      :class="listIndex=='upList'?'text-red':listIndex=='downList'?'text-green':''"></text> {{item.sSecName}}</view>
              <view class="text-gray text-sm margin-left">
                {{item.sDtSecCode}}
              </view>
            </view>
            <view>{{item.fNow}}</view>
            <view class="action c-width"
                  :class="listIndex=='upList'?'c-red':listIndex=='downList'?'c-green':''">
              {{isAdd[listIndex]}} {{item.fFhsl}}%
            </view>
          </view>
        </view>
      </section>

    </section>
    <!-- 诊股 -->
    <section v-show="TabCur==2">
      <div class="cu-bar search bg-white">
        <div class='search-form round'>
          <text class="icon-search"></text>
          <input type="text"
                 placeholder="输入代码"
                 v-model="inputVal"
                 confirm-type="search" />
        </div>
        <div class='action'>
          <button class='cu-btn bg-green shadow-blur round'
                  @click="getSearch">查询</button>
        </div>
      </div>
      <view class="cu-card dynamic">
        <view class="cu-item shadow">
          <view class="cu-bar bg-white solid-bottom">
            <view class='action'>
              <text class='icon-titles text-orange '></text> 动向
            </view>
          </view>
          <view class='text-content'>
            {{jettons[0]}}
          </view>
          <view class='text-content'>
            {{jettons[1]}}
          </view>
          <view class="cu-bar bg-white solid-bottom">
            <view class='action'>
              <text class='icon-titles text-orange'></text> 整体趋势
            </view>
          </view>
          <div class="text-content">
            <div v-html="trendData"></div>
          </div>
          <view class="grid flex-sub padding-lr">
            <view class="bg-img"
                  style="background-image:url(https://image.weilanwl.com/img/square-1.jpg);">
            </view>
          </view>
          <view class='text-gray text-sm text-right padding'>
            <text class="icon-attentionfill"></text>{{searchDate}}
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
import { regular, formatTime } from "@/utils/index"
import { mapMutations } from "vuex"
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'

//echarts
let chart = null;
let option = {
  backgroundColor: '#fff',
  legend: {
    bottom: "0",
    center: '0',
    itemWidth: 15,  //图例标记的图形宽度
    itemHeight: 5, //图例标记的图形高度
    itemGap: 10,
    selectedMode: false
  },
  series: [
    // 中心的圆圈
    {
      radius: ['52%', '60%'],
      center: ['50%', '50%'],
      type: 'pie',
      label: {
        normal: {
          show: true,
          formatter: "{b} : {c}家"
        },
      },
      labelLine: {
        normal: {
          show: true,
          length: 15,
          length2: 18
        }
      },
      hoverAnimation: false,
      silent: true,
      data: [{
        "name": "涨股数",
        "value": 95,

      }, {
        "name": "跌股数",
        "value": 12,

      }]
    },
    {
      radius: '44%',
      center: ['50%', '50%'],
      type: 'pie',
      label: {
        normal: {
          show: true,
          formatter: "{b} : {c}支"
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: [{
        name: "涨公司",
        value: 90,
        selected: true
      }, {
        name: "跌公司",
        value: 10
      }],
      hoverAnimation: false,
      silent: true,
      selectedMode: 'single',
      selectedOffset: 3
    },
  ]
}
function initChart (canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(option);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}
export default {
  name: 'market',
  components: {
    mpvueEcharts
  },
  data () {
    return {
      elements: [
        { title: '操作条', name: 'bar', color: 'purple', icon: 'vipcard' },
        { title: '导航栏 ', name: 'nav', color: 'mauve', icon: 'formfill' },
        { title: '列表', name: 'list', color: 'pink', icon: 'list' },
      ],
      TabCur: 0,
      dataList: { zdfb_data: { dnum: {} }, jrbx_data: { last_zdf: {} }, zdt_data: { last_zdt: {} } },
      is_capture_nodes: false,
      is_complete: false,
      inputVal: '',
      jettons: [],
      trendData: '',
      searchDate: '',
      rank: {
        page: 0,
        list: [],
        listIndex: {}
      },
      resultList: {
        'upList': [],
        'downList': [],
        'changeList': []
      },
      requestList: {

      },
      nameList: {
        'upList': '涨幅榜',
        'downList': '跌幅榜',
        'changeList': '换手率榜'
      },
      isAdd: {
        'upList': '+',
        'downList': "-",
        'changeList': ''
      },
      addRate: 50,
      reduceRate: 50,
      chart: '',
      onInit: initChart,
      echarts,
      imgList: []
    }
  },
  onLoad (pageConfig) {
    this.getList()
    this.elements.map(v => {
      Object.assign(v, {
        bg: `bg-${v.color}`,
        iconfont: `icon-${v.icon}`
      })
    })
    const db = wx.cloud.database()
    const banner = db.collection('banner')
    banner.get().then(res => {
      this.imgList = res.data[0].list || []
      if (this.imgList.length == 3) {
        this.inputVal = '2019-05-22'
        this.TabCur = 2
      }
    }).catch(error => console.log(error))
  },
  onShow () {
    let id = this.$store.state.code || ''
    if (id) {
      this.TabCur = 2
      this.inputVal = id
      this.getStockJetton(this.inputVal)
    }
  },
  methods: {
    ...mapMutations({
      setCode: "SET_CODE",
    }),
    getList () {
      this.is_capture_nodes = true
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getMarket' }
      }).then(res => {
        this.dataList = res.result.home ? JSON.parse(res.result.home) : {}
        // let total = parseInt(this.dataList.zdfb_data.znum) + parseInt(this.dataList.zdfb_data.dnum)
        // this.addRate = ((parseInt(this.dataList.zdfb_data.znum) / total) * 100).toFixed(0)
        // this.reduceRate = ((parseInt(this.dataList.zdfb_data.dnum) / total) * 100).toFixed(0)
        this.is_complete = true
        //更新echarts
        option.series[0].data = [{
          name: '涨股数',
          value: this.dataList.zdfb_data.znum
        }, {
          name: '跌股数',
          value: this.dataList.zdfb_data.dnum
        }]
        option.series[1].data = [{
          name: '涨停',
          value: this.dataList.zdt_data.last_zdt.ztzs,
          selected: true
        }, {
          name: '跌停',
          value: this.dataList.zdt_data.last_zdt.dtzs
        }]
        chart.setOption(option)
      }).catch(error => {
        console.log(error)
      })
    },
    tabSelect (index) {
      this.TabCur = index
      if (index == 1) this.getRankList()
    },
    getSearch () {
      if (this.inputVal === '2019-05-22') {
        this.jettons = ['今日天气晴朗,阳光普照！']
        this.trendData = '长势喜人'
      } else if (this.inputVal.includes('-')) {
        this.jettons = ['暂无数据，试试查查今日！']
        this.trendData = '暂无数据，试试查查今日！'
      }
      this.getStockJetton(this.inputVal)
    },
    getRankList () {
      this.getAllList()
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getRankList', action: 'quote', seccode: '0105000001|0005399001|0005399006|2005888001|0005399005|0005399300|0105000016|0105000905|0306IFLX0|0306IHLX0|0306ICLX0' }
      }).then(res => {
        let getData = JSON.parse(res.result.home.content) ? JSON.parse(res.result.home.content).vSecQuote : []
        this.rank.page = Math.ceil(getData.length / 6) || 0
        this.rank.list = getData
        for (let i = 0; i < this.rank.page; i++) {
          this.rank.listIndex[i] = this.rank.list.slice(6 * i, (i + 1) * 6)
        }
        this.rank.list.forEach(v => {
          let ride = (parseFloat(v.fNow) - parseFloat(v.fClose)) / parseFloat(v.fNow)
          v.rice = (parseFloat(v.fNow) - parseFloat(v.fClose)).toFixed(2)
          v.rate = (ride * 100).toFixed(2)
          v.fNow = parseFloat(v.fNow).toFixed(2)
          v.riceStatus = v.rice > 0
          v.rateStatus = v.rate > 0
        })
      }).catch(error => {
        console.log(error)
      })
    },
    async getAllList () {
      this.requestList = {
        'upList': {
          marketType: 0,
          colType: 14,
          start: 0,
          count: 10,
          sortType: 1,
          plateQuoteType: 1
        },
        'downList': {
          marketType: 0,
          colType: 14,
          start: 0,
          count: 10,
          sortType: 2,
          plateQuoteType: 1
        },
        'changeList': {
          marketType: 0,
          colType: 36,
          start: 0,
          count: 10,
          plateQuoteType: 1,
          sortType: 1
        }
      }
      let num = 0
      for (let i in this.requestList) {
        num++
        let res = await this.getRankReal(this.requestList[i], num * 100)
        let result = JSON.parse(res.result.home.content) ? JSON.parse(res.result.home.content).vPlateQuoteDesc : []
        this.resultList[i] = result
        this.resultList[i].forEach(v => {
          v.fNow = parseFloat(v.fNow).toFixed(2)
          v.fFhsl = (parseFloat(v.fFhsl) * 100).toFixed(2)
          v.sDtSecCode = v.sDtSecCode.substring(4)
        })
      }
    },
    getRankReal (item, num) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(wx.cloud.callFunction({
            name: 'reptile',
            data: { type: 'getRankReal', action: 'quote', ...item }
          }))
        }, num)
      })
    },
    getStockJetton (code) {
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getStockJetton', id: code }
      }).then(res => {
        this.jettons = this.parseJetton(res.result.home)
        this.trendData = this.parseResult(res.result.home)
        this.searchDate = formatTime(new Date())
        //清除保留的诊股id
        if (this.$store.state.code) this.setCode('')
      }).catch(error => {
        console.log(error)
      })
    },
    parseJetton (page) {
      let jettonReg = /<div class="box3 jgcc indexStat"[\s\S]*?class="hd2">([\s\S]*?)<\/div>[\s\S]*?<div class="jgcc_text fl">([\s\S]*?)<\/div>/gim
      let tmpJettons,
        jettons = []
      if ((tmpJettons = jettonReg.exec(page)) != null) {
        jettons.push(regular(tmpJettons[1]))
        jettons.push(regular(tmpJettons[2]))
      }
      return jettons
    },
    parseResult (page) {
      let tmpResult
      let rex = /<div class="value_info">([\s\S]*?)<\/div>/gim
      tmpResult = rex.exec(page)[1]
      return tmpResult
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.marketConfig {
  width: 100vw;
  height: 100vh;
}
.nav-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 40rpx 0px;
  justify-content: space-between;
}

.nav-li {
  padding: 30rpx;
  border-radius: 12rpx;
  width: 45%;
  margin: 0 2.5% 40rpx;
  background-image: url(https://image.weilanwl.com/color2.0/cardBg.png);
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
}

.nav-li::after {
  content: "";
  position: absolute;
  z-index: -1;
  background-color: inherit;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: -10%;
  border-radius: 10rpx;
  opacity: 0.2;
  transform: scale(0.9, 0.9);
}

.nav-li.cur {
  color: #fff;
  background: rgb(94, 185, 94);
  box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
}

.nav-title {
  font-size: 32rpx;
  font-weight: 300;
}

.nav-title::first-letter {
  font-size: 40rpx;
  margin-right: 4rpx;
}

.nav-name {
  font-size: 28rpx;
  text-transform: Capitalize;
  margin-top: 20rpx;
  position: relative;
}

.nav-name::before {
  content: "";
  position: absolute;
  display: block;
  width: 40rpx;
  height: 6rpx;
  background: #fff;
  bottom: 0;
  right: 0;
  opacity: 0.5;
}

.nav-name::after {
  content: "";
  position: absolute;
  display: block;
  width: 100rpx;
  height: 1px;
  background: #fff;
  bottom: 0;
  right: 40rpx;
  opacity: 0.3;
}

.nav-name::first-letter {
  font-weight: bold;
  font-size: 36rpx;
  margin-right: 1px;
}

.nav-li text {
  position: absolute;
  right: 30rpx;
  top: 30rpx;
  font-size: 52rpx;
  width: 60rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
}

.text-light {
  font-weight: 300;
}

@keyframes show {
  0% {
    transform: translateY(-50px);
  }

  60% {
    transform: translateY(40rpx);
  }

  100% {
    transform: translateY(0px);
  }
}

@-webkit-keyframes show {
  0% {
    transform: translateY(-50px);
  }

  60% {
    transform: translateY(40rpx);
  }

  100% {
    transform: translateY(0px);
  }
}
.rank-ul {
  display: flex;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  padding: 20rpx;
  justify-content: flex-start;
  flex-wrap: wrap;
  .rank-li {
    display: flex;
    width: calc((100% - 40rpx) / 3);
    height: 150rpx;
    background: #fff;
    margin-right: 20rpx;
    margin-bottom: 40rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4rpx 4rpx 0px rgba(210, 210, 210, 0.75);
    border-radius: 4rpx;
    background: linear-gradient(
        to bottom,
        #d5dee7 0%,
        #e8ebf2 50%,
        #e2e7ed 100%
      ),
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.02) 50%,
        rgba(255, 255, 255, 0.02) 61%,
        rgba(0, 0, 0, 0.02) 73%
      ),
      linear-gradient(
        33deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(0, 0, 0, 0.2) 100%
      );
    background-blend-mode: normal, color-burn;
    .rank-title {
      font-size: 18px;
    }
    .num-div {
      text-align: center;
      span {
        margin: 10rpx;
      }
    }
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
.c-red {
  color: red;
}
.c-green {
  color: green;
}
.c-width {
  width: 200rpx;
  text-align: center;
}
.bg-set {
  background: linear-gradient(to bottom right, #f73240 60%, #e91a28);
}
</style>

<style lang="less">
.marketConfig .cu-card.dynamic > .cu-item > .text-content {
  max-heigth: 10em;
  white-space: pre-line;
  overflow: auto;
  ul {
    padding: 0;
    li {
      list-style: none;
    }
  }
}
.cu-list + .cu-list {
  margin-top: 0;
}
.echarts-wrap {
  width: 100%;
  height: 360rpx;
}
</style>


