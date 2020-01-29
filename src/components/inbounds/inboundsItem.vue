<template>
  <section class='inbounds-container' v-show="show">
    <!-- 仓库名称 -->
    <ul class="select-ul" v-if="setNavIndex===0">
      <li 
      v-for="(item,index) in wareList"
      class="select-li text-606"
      :class="selectIndex[setNavIndex]===index?'text-green':''"
      @click="confirm(index,item)" 
      :key="index">
        {{item.warehouseName}}
      </li>
    </ul>
    <!-- 状态属性 -->
    <ul class="select-ul" v-if="setNavIndex===1">
      <li 
      v-for="(item,index) in statusList"
      class="select-li text-606"
      :class="selectIndex[setNavIndex]===index?'text-green':''"
      @click="confirm(index,item)" 
      :key="index">
        {{item.label}}
      </li>
    </ul>
    <!-- 筛选属性 -->
    <div class="prd-filter" v-if="setNavIndex===2">
      <template v-for="(item,index) in tabList">
        <span :key="index" class="filter-title">{{item.title}}</span>
        <ul :key="index" class="prd-flex">
          <li v-for="(sign,sindex) in item.options" :key="sindex" :class="sindex!=0?'ml20':''">
            <span class='cu-tag light round padding' :class="item.index===sindex?'line-green':'bg-grey'" @click="filterClick(item,sindex)">{{sign.label}}</span>
          </li>
        </ul>
      </template>
    </div>
    <div class="cu-form-group" v-if="setNavIndex===2">
      <!-- 生产日期 -->
      <div class="action group-label">创建时间</div>
      <picker mode="date" :value="proDate[0]" start="2017-01-01" end="2025-09-01" @change="DateChange($event,1)">
        <div class="picker">
          <span v-if="proDate[0]">{{proDate[0]}}</span>
          <span class="content-888" v-else>请输入开始时间</span>
        </div>
      </picker>
      <span class="width20">-</span>
      <picker mode="date" :value="proDate[1]" start="2017-01-01" end="2025-09-01" @change="DateChange($event,2)">
        <div class="picker">
          <span v-if="proDate[1]">{{proDate[1]}}</span>
          <span class="content-888" v-else>请输入结束时间</span>
        </div>
      </picker>
    </div>
    <div class="batch-foolter" v-if="setNavIndex===2">
        <button class="cu-btn round line-grey lg with-250" @click="reset">重置</button>
        <button class="cu-btn round bg-green lg ml20 with-250" @click="search">确定</button>
      </div>
</section>
</template>

<script>
import {formatTime} from '@/utils'

export default {
  name: 'inboundsItem',
  props: ['show', 'setNavIndex', 'wareList'],
  data () {
    return {
      statusList: [{
        label: '全部',
        value: ''
      }, {
        label: '初始',
        value: 'BEGIN'
      }, {
        label: '审核',
        value: 'AUDIT'
      }, {
        label: '确认',
        value: 'CONFIRM'
      }, {
        label: '部分收货',
        value: 'PART_FINISH'
      }, {
        label: '完成',
        value: 'FINISH'
      }],
      selectIndex: {
        '0': 0,
        '1': 0
      },
      proDate: [formatTime(+new Date() - 3600 * 6 * 24 * 1000, 'YYYY-MM-DD'), formatTime(new Date(), 'YYYY-MM-DD')],
      tabList: [{
        title: '订单类型',
        index: -1,
        options: [{
          label: '采购入库单',
          value: '10002'
        }, {
          label: '退货入库单',
          value: '10003'
        }]
      }, {
        title: '作废状态',
        index: -1,
        options: [{
          label: '未作废',
          value: '0'
        }, {
          label: '已作废',
          value: '1'
        }]
      }]
    }
  },
  methods: {
    filterClick (item, sindex) {
      if (item.index === sindex) return (item.index = -1)
      item.index = sindex
    },
    confirm (index, item) {
      this.selectIndex[this.setNavIndex] = index
      this.search()
    },
    DateChange (e, index) {
      this.proDate[index - 1] = e.mp.detail.value
      // 防止对象引用问题
      this.proDate = this.proDate.slice()
    },
    search () {
      let orderObj = this.tabList[0].options[this.tabList[0].index] || ''
      let delFlagObj = this.tabList[1].options[this.tabList[1].index] || ''
      let form = {
        warehouse_name: this.wareList[this.selectIndex[0]].warehouseName,
        warehouse_no: this.wareList[this.selectIndex[0]].warehouseId,
        status: this.statusList[this.selectIndex[1]].value,
        statusName: this.statusList[this.selectIndex[1]].label,
        order_type: orderObj.value || '',
        delFlag: delFlagObj.value || '',
        cre_begin_time: this.proDate[0] ? `${this.proDate[0]} 00:00:00` : '',
        cre_end_time: this.proDate[1] ? `${this.proDate[1]} 23:59:59` : ''
      }
      this.$emit('confirm', form)
    },
    reset () {
      this.proDate = [formatTime(+new Date() - 3600 * 6 * 24 * 1000, 'YYYY-MM-DD'), formatTime(new Date(), 'YYYY-MM-DD')]
      this.tabList.map(v => {
        v.index = -1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.inbounds-container{
  width:100%;
  height:580rpx;
  background:#fff;
  position:absolute;
  top:80rpx;
  left:0;
  width:100%;
  z-index:100;
  .select-ul{
    height:100%;
    text-align: left;
    padding:0 60rpx;
    overflow:auto;
    .select-li{
      line-height:100rpx
    }
  }
  .batch-foolter{
    position:absolute;
    bottom:20rpx;
    left:calc(50% - 130px);
  }
}
.cu-form-group{
  padding:0 60rpx;
  flex-wrap:wrap;
  .group-label{
    width:100%;
    height:60rpx;
    line-height:100rpx
  }
  .group-input{
    height:80rpx;
    line-height:80rpx;
    border-bottom:1rpx solid #F1F1F1
  }
  .width20{
    width:40rpx
  }
  picker{
    height:90rpx;
    &::after{
      display:none
    }
    .picker{
      height:90rpx;
      text-align:left;
      border-bottom:1rpx solid #F1F1F1
    } 
  }
}
.prd-flex{
  display:flex;
  // justify-content: space-between;
  align-items:center;
  flex-wrap: wrap;
}
.prd-filter{
  padding:0 60rpx;
  .filter-title{
    height:80rpx;
    line-height:80rpx
  }
}
</style>