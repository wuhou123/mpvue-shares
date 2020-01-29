<template>
<div>
  <section class="msg-card" v-for="(itemData,index) in listData" :key="index">
    <ul class="msg-ul" @click="selectIndex(itemData)">
      <li class="fontSize-20 text-606">{{itemData.sendWarehouse || ''}}</li>
      <li class="text-orange" style="position:relative">
        <img src="../../../static/images/arrow_1.png" alt="" style="width:122rpx;height:16rpx;z-index:1">
        <span class="text-date">
          <span class="text-date-num">
            {{itemData.transportTime}}{{types[itemData.transportTimeUnit]}}
          </span>
        </span>
      </li>
      <li class="fontSize-20">{{itemData.receiveWarehouse}}</li>
      <li class="right-text text-orange">
        暂无报价
      </li>
    </ul>
    <div style="padding-left:35rpx" @click="itemData.status=!itemData.status">
      <span class="text-zero" :class="itemData.transportType=='LD'?'bg-orange':'bg-qing'">{{itemData.transportType=='LD'?'零':'整'}}</span>
      <span class="content-888 ml10">{{itemData.isFixedShift==1?'随时发车':(itemData.shiftFrequency===1?'每':'每隔'+itemData.shiftFrequency)+types[itemData.shiftCycle]+'的'+(itemData.shiftDetailShort||'暂无')+'发车'}}</span>
    </div>
    <section class="sub-title content-888" v-if="itemData.status">
      <ul class="sub-ul border-bottom">
        <li class="text-green"><text class="icon-roundcheck"></text>{{transportTypes[itemData.transportType]}}</li>
        <li class="text-green"><text class="icon-roundcheck"></text>{{itemData.temperatureType||'-'}}</li>
        <li class="text-green"><text class="icon-roundcheck"></text>{{lineTypes[itemData.lineType]}}</li>
        <li class="text-green"><text class="icon-roundcheck"></text>
          <text>{{itemData.goodsType || '普货'}}</text>
        </li>
      </ul>
      <p class="h-70">发车时间：{{itemData.isFixedShift==1?'随时发车':(itemData.shiftFrequency===1?'每':'每隔'+itemData.shiftFrequency)+types[itemData.shiftCycle]+'的'+(itemData.shiftDetail||'暂无')+'发车'}}</p>
      <p class="h-70">截单时间：发车前{{itemData.advanceDays}}天 {{itemData.cutTime}}</p>
    </section>
  </section>
</div>

</template>

<script>
export default {
  name: 'transferCard',
  props: ['listData'],
  data () {
    return {
      setIndex: -1,
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
      lineTypes: {
        'CJ': '城际',
        'TC': '同城'
      }
    }
  },
  methods: {
    selectIndex (item) {
      item.status = !item.status
    }
  },
  onLoad () {},
  onReady () {}
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
    transform: translate(0,40rpx)
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


