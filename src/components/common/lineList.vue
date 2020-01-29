<template>
<div class="line-container">
  <!-- 整车 -->
  <div v-if="type=='fullCar'">
    <ul class="line-ul">
      <li v-for="(item,index) in titleData" :key="index">{{item}}</li>
    </ul>
    <ul>
      <li v-for="(val,sindex) in itemData" :key="sindex" class="line-li">
        <span>{{val.price1}}</span>
        <span class="line-black"></span>
        <span>{{val.price2}}</span>
        <span class="font-DIN" v-if="false">{{val.price2}}</span>
      </li>
    </ul>
  </div>

  <!-- 零担 -->
  <div v-else>
    <div v-for="(sign,jindex) in listData" :key="jindex">
      <div class="title" :key="jindex" :class="{'text-green':jindex==1}">{{sign.title}}</div>
      <ul class="line-ul" :key="jindex">
        <li v-for="(item,index) in sign.titleData" :key="index">{{item}}</li>
      </ul>
      <ul :key="jindex">
        <li v-for="(val,sindex) in sign.itemData" :key="sindex" class="line-li">
          <span>{{val.price1}}</span>
          <span class="line-black"></span>
          <span class="font-DIN">{{val.price2}}</span>
        </li>
        <div class="no-data">暂无报价!</div>
      </ul>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'lineList',
  props: ['titleData', 'itemData', 'type'],
  data () {
    return {
      listData: [{
        title: '重货价格',
        titleData: ['重量范围(KG)', '价格(元/KG)'],
        itemData: []
      }, {
        title: '抛货价格',
        titleData: ['体积范围(m³)', '价格(元/m³)'],
        itemData: []
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.line-container{
  margin:50rpx;
  .line-ul{
    display:flex;
    justify-content: space-between;
    align-items:center;
    margin:36rpx 0
  }
  .line-li{
    height:60rpx;
    display:flex;
    justify-content: space-between;
    align-items:center;
    line-height:60rpx;
    .line-black{
      width:460rpx;
      height:2rpx;
      background:#979797
    }
  }
  .title{
    height:76rpx;
    line-height:76rpx;
    color:#FF6E00;
    border-bottom:1px solid #979797;
    padding-left:10rpx;
  }
  .text-green{
    color:#00C188
  }
  .no-data{
    text-align:center;
    margin:20px;
  }
}

</style>

