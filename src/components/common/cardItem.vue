<template>
<div>
  <section class="msg-card">
    <ul class="msg-ul" @click="isShow=!isShow">
      <li>
        <p class="fontSize-20 text-606">{{itemData.sendDistrict?itemData.sendDistrict:itemData.sendCity}}</p>
        <p class="content-888">{{itemData.sendDistrict?itemData.sendCity:itemData.sendProvince}}</p>
      </li>
      <li class="text-orange" style="position:relative">
        <img src="../../../static/images/arrow_1.png" alt="" style="width:122rpx;height:16rpx;z-index:1">
        <span class="text-date">
          <span class="text-date-num">
            {{itemData.transportTime}}{{types[itemData.transportTimeUnit]}}
          </span>
        </span>
      </li>
      <li>
        <p class="fontSize-20">{{itemData.receiveDistrict?itemData.receiveDistrict:itemData.receiveCity}}</p>
        <p class="content-888">{{itemData.receiveDistrict?itemData.receiveCity:itemData.receiveProvince}}</p>          
      </li>
      <li class="right-text" @click.stop="showMask()">
        <div style="text-align:right">
          <p>
            <span class="text-orange">暂无报价</span>
            <span class="text-orange fontSize-28 font-DIN" v-if="false">760</span>
          </p>
          <p class="text-ccc">明细</p>
        </div>
        <span class="icon-right"></span>
      </li>
    </ul>
    <div style="padding-left:35rpx" @click="isShow=!isShow">
      <span class="text-zero" :class="itemData.transportType=='LD'?'bg-orange':'bg-qing'">{{itemData.transportType=='LD'?'零':'整'}}</span>
      <span class="content-888 ml10">最近发货日：{{itemData.isFixedShift==1?'随时发车':itemData.pdmTrunkShiftVoList[0]?itemData.pdmTrunkShiftVoList[0].departureDate:'暂无'}}</span>
    </div>
    <section class="sub-title content-888" v-if="isShow">
      <ul class="sub-ul border-bottom">
        <li class="text-green"><text class="icon-roundcheck"></text>{{transportTypes[itemData.transportType]}}</li>
        <li class="text-green"><text class="icon-roundcheck"></text>{{itemData.temperatureType||'-'}}</li>
        <li class="text-green"><text class="icon-roundcheck"></text>{{lineTypes[itemData.lineType]}}</li>
        <li class="text-green"><text class="icon-roundcheck"></text>
          <text>{{itemData.goodsType || '普货'}}</text>
        </li>
      </ul>
      <div class="border-bottom">
        <ul class="sub-ul">
          <li>班次：{{['固定','不固定'][itemData.isFixedShift]}}</li>
          <li>频率：
            <span v-if="itemData.isFixedShift==0">{{itemData.shiftFrequency}}次/{{types[itemData.shiftCycle]}}</span>
            <span v-else>随时发车</span>
          </li>
          <li>运输时效：{{itemData.transportTime}}{{types[itemData.transportTimeUnit]}}</li>
        </ul>
        <p class="h-70">发车时间：{{itemData.isFixedShift==1?'随时发车':itemData.shiftsList||'暂无'}}</p>
      </div>

      <p class="h-70">截单时间：发车前{{itemData.advanceDays}}天 {{itemData.cutTime}}</p>
    </section>
  </section>
</div>

</template>

<script>
export default {
  name: 'cardItem',
  props: ['itemData'],
  data () {
    return {
      isShow: false,
      types: {
        'DAY': '天',
        'WEEK': '周',
        'MONTH': '月',
        'HOUR': '小时'
      },
      transportTypes: {
        'LD': '零担',
        'ZC': '整车'
      },
      temTypes: {
        'LD': '冷冻',
        'LC': '冷藏',
        'CW': '常温'
      },
      lineTypes: {
        'CJ': '城际',
        'TC': '同城'
      },
      getGoodTypes: {}
    }
  },
  methods: {
    showMask () {
      this.$emit('show')
    },
    transformData () {
      let goods = []
      let temps = []
      if (this.itemData.goodsType && this.itemData.goodsType.includes(',')) {
        this.itemData.goodsType.split(',').forEach(v => {
          goods.push(this.$store.state.products[v])
        })
        this.itemData.goodsType = goods.join('/')
      } else this.itemData.goodsType = this.itemData.goodsType ? this.$store.state.products[this.itemData.goodsType] : ''
      if (this.itemData.temperatureType && this.itemData.temperatureType.includes(',')) {
        this.itemData.temperatureType.split(',').forEach(v => {
          temps.push(this.temTypes[v])
        })
        this.itemData.temperatureType = temps.join('/')
      } else this.itemData.temperatureType = this.itemData.temperatureType ? this.temTypes[this.itemData.temperatureType] : ''
    }
  },
  computed: {
    goodTypes (val) {
      return this.$store.state.products
    }
  },
  watch: {
    goodTypes (val) {
      this.getGoodTypes = val
      this.transformData()
    }
  },
  onLoad () {
    this.isShow = false
    this.getGoodTypes = this.$store.state.products
  },
  onReady () {
    if (this.$store.state.products) this.transformData()
  }
}
</script>

<style lang="less" scoped>
.msg-card{
  min-height:200rpx;
  margin:15rpx;
  background:#fff;
  border-radius:8rpx;
  padding-bottom:20rpx;
  position:relative;
  .msg-ul{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:35rpx;
    .text-date{
      position:absolute;
      left:0;
      top:0;
      bottom:0;
      right:0;
      margin:auto;
      background:#fff;
      text-align:center;
      .text-date-num{
        background:#fff;
        position:relative;
        z-index:1
      }
    }
  }
  .text-zero{
    display:inline-block;
    width:35rpx;
    height:35rpx;
    line-height:35rpx;
    text-align:center;
    color:#fff;
    border-radius:4rpx;
  }
  .right-text{
    display:flex;
    align-items:center;
    justify-content: flex-end;
    .icon-right{
      margin-left:15rpx
    }
  }
}
.sub-title{
  background:#FBFBFB;
  padding:5rpx 30rpx;
  margin:22rpx 8rpx 0rpx 8rpx;
  .sub-ul{
    line-height:80rpx;
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap: wrap;
    .icon-roundcheck{
      margin-right:4rpx
    }
  }
}
</style>


