<template>
  <section class='select-container' v-show="show">
    <!-- 仓库名称 -->
    <ul class="select-ul" v-if="setNavIndex===0">
      <li 
      v-for="(item,index) in wareList"
      class="select-li text-606"
      :class="selectIndex===index?'text-green':''"
      @click="confirm(index,item)" 
      :key="index">
        {{item.warehouseName}}
      </li>
    </ul>
    <!-- 批次属性 -->
    <div v-if="setNavIndex===1">
			<div class="cu-form-group">
        <!-- 生产日期 -->
				<div class="action group-label">生产日期</div>
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
        <!-- 到期日期 -->
				<div class="action group-label">到期日期</div>
				<picker mode="date" :value="expirtDate[0]" start="2017-09-01" end="2025-09-01" @change="DateChange($event,3)">
					<div class="picker">
            <span v-if="expirtDate[0]">{{expirtDate[0]}}</span>
            <span class="content-888" v-else>请输入开始时间</span>
					</div>
				</picker>
        <span class="width20">-</span>
				<picker mode="date" :value="expirtDate[1]" start="2017-09-01" end="2025-09-01" @change="DateChange($event,4)">
					<div class="picker">
            <span v-if="expirtDate[1]">{{expirtDate[1]}}</span>
            <span class="content-888" v-else>请输入结束时间</span>
					</div>
				</picker>
        <!-- 批次号 -->
        <div class="action group-label">批次号</div>
        <input type="text" class="group-input" placeholder="请输入批次号" placeholder-style="color:#2D2D2" v-model="form.bacth_code">
			</div>
    </div>
    <!-- 筛选属性 -->

    <div v-if="setNavIndex===2" class="prd-filter">
      <template v-for="(item,index) in tabList">
        <span :key="index" class="filter-title">{{item.title}}</span>
        <ul :key="index" class="prd-flex">
          <li v-for="(sign,sindex) in item.options" :key="sindex" :class="sindex!=0?'ml20':''">
            <span class='cu-tag light round padding' :class="item.index===sindex?'line-green':'bg-grey'" @click="filterClick(item,sindex)">{{sign}}</span>
          </li>
        </ul>
      </template>

    </div>
    <div class="batch-foolter" v-if="setNavIndex!==0">
        <button class="cu-btn round line-grey lg with-250" @click="reset">重置</button>
        <button class="cu-btn round bg-green lg ml20 with-250" @click="search">确定</button>
      </div>
</section>
</template>

<script>
export default {
  name: 'selectItem',
  props: ['show', 'setNavIndex', 'wareList', 'isBatch'],
  data () {
    return {
      selectIndex: 0,
      form: {
        bacth_code: ''
      },
      proDate: ['', ''],
      expirtDate: ['', ''],
      tabList: [{
        title: '质保标识',
        index: -1,
        options: ['质保期', '已临期', '禁售期', '已过期']
      }, {
        title: '库存类型',
        index: -1,
        options: ['正品', '残品', '赠品']
      }]
    }
  },
  methods: {
    filterClick (item, sindex) {
      if (item.index === sindex) return (item.index = -1)
      item.index = sindex
    },
    confirm (index, item) {
      this.selectIndex = index
      if (this.isBatch) {
        return this.search()
      } else this.$emit('confirm', item)
    },
    DateChange (e, index) {
      if (index <= 2) this.proDate[index - 1] = e.mp.detail.value
      else this.expirtDate[index - 3] = e.mp.detail.value
      // 防止对象引用问题
      this.proDate = this.proDate.slice()
      this.expirtDate = this.expirtDate.slice()
    },
    search () {
      this.getBatchForm()
      this.$emit('confirm', this.form)
    },
    getBatchForm () {
      Object.assign(this.form, {
        warrantyLabel: this.tabList[0].index + 1 || '',
        stock_place_name: this.tabList[1].options[this.tabList[1].index] || '',
        product_date_begin: this.proDate[0],
        product_date_end: this.proDate[1],
        expiry_date_begin: this.expirtDate[0],
        expiry_date_end: this.expirtDate[1],
        warehouse_no: this.wareList[this.selectIndex].warehouseId,
        warehouseName: this.wareList[this.selectIndex].warehouseName
      })
    },
    reset () {
      if (this.setNavIndex === 1) {
        this.proDate = ['', '']
        this.expirtDate = ['', '']
        this.form.bacth_code = ''
      } else this.tabList.forEach(v => (v.index = -1))
    }
  }
}
</script>

<style lang="less" scoped>
.select-container{
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