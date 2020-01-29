<template>
  <section
    class='incrementItem-container'
    v-show="show"
  >
    <!-- 仓库名称 -->
    <ul
      class="select-ul"
      v-if="setNavIndex===0"
    >
      <li
        v-for="(item,index) in wareList"
        class="select-li text-606"
        :class="selectIndex[setNavIndex]===index?'text-green':''"
        @click="confirm(index,item)"
        :key="index"
      >
        {{item.warehouseName}}
      </li>
    </ul>
    <!-- 增值项 -->
    <div
      class="increment-div"
      v-if="setNavIndex===1"
    >
      <ul class="select-ul">
        <li
          class="select-li"
          v-for="(item,index) in firstCateList"
          :key="index"
          @click="checkFirstCate(item,index)"
          :class="firstCateIndex===index?'text-green':''"
        >{{item.categoryName}}</li>
      </ul>
      <ul
        class="select-ul animation-fade"
        v-if="secondCateList&&secondCateList.length>0"
      >
        <li
          class="select-li text-cut"
          v-for="(item,index) in secondCateList"
          :key="index"
          @click="checkSecondCate(item,index)"
          :class="secondCateIndex===index?'text-green':''"
        >{{item.categoryName}}</li>
      </ul>
    </div>
    <!-- 状态属性 -->
    <ul
      class="select-ul"
      v-if="setNavIndex===2"
    >
      <li
        v-for="(item,index) in statusList"
        class="select-li text-606"
        :class="selectIndex[setNavIndex]===index?'text-green':''"
        @click="confirm(index,item)"
        :key="index"
      >
        {{item.label}}
      </li>
    </ul>
    <!-- 筛选属性 -->
    <div
      class="prd-filter"
      v-if="setNavIndex===3"
    >
      <template v-for="(item,index) in tabList">
        <span
          :key="index"
          class="filter-title"
        >{{item.title}}</span>
        <ul
          :key="index"
          class="prd-flex"
        >
          <li
            v-for="(sign,sindex) in item.options"
            :key="sindex"
            :class="sindex!=0?'ml20':''"
          >
            <span
              class='cu-tag light round padding'
              :class="item.index===sindex?'line-green':'bg-grey'"
              @click="filterClick(item,sindex)"
            >{{sign.label}}</span>
          </li>
        </ul>
      </template>
    </div>
    <div
      class="cu-form-group"
      v-if="setNavIndex===3"
    >
      <!-- 生产日期 -->
      <div class="action group-label">创建时间</div>
      <picker
        mode="date"
        :value="proDate[0]"
        start="2017-01-01"
        end="2025-09-01"
        @change="DateChange($event,1)"
      >
        <div class="picker">
          <span v-if="proDate[0]">{{proDate[0]}}</span>
          <span
            class="content-888"
            v-else
          >请输入开始时间</span>
        </div>
      </picker>
      <span class="width20">-</span>
      <picker
        mode="date"
        :value="proDate[1]"
        start="2017-01-01"
        end="2025-09-01"
        @change="DateChange($event,2)"
      >
        <div class="picker">
          <span v-if="proDate[1]">{{proDate[1]}}</span>
          <span
            class="content-888"
            v-else
          >请输入结束时间</span>
        </div>
      </picker>
    </div>
    <div
      class="batch-foolter"
      v-if="setNavIndex===3"
    >
      <button
        class="cu-btn round line-grey lg with-250"
        @click="reset"
      >重置</button>
      <button
        class="cu-btn round bg-green lg ml20 with-250"
        @click="search"
      >确定</button>
    </div>
  </section>
</template>

<script>
import { formatTime } from '@/utils'

export default {
  name: 'incrementItem',
  props: ['show', 'setNavIndex', 'wareList'],
  data() {
    return {
      firstCateIndex: 0,
      secondCateIndex: -1,
      firstCateList: [],
      secondCateList: [],
      statusList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未确认',
          value: 'UN_CONFIRM'
        },
        {
          label: '已确认',
          value: 'CONFIRM'
        },
        {
          label: '作业中',
          value: 'IN_EXECUTION'
        },
        {
          label: '已完成',
          value: 'FINISH'
        }
      ],
      selectIndex: {
        '0': 0,
        '2': 0
      },
      proDate: [
        formatTime(+new Date() - 3600 * 6 * 24 * 1000, 'YYYY-MM-DD'),
        formatTime(new Date(), 'YYYY-MM-DD')
      ],
      tabList: [
        {
          title: '作废状态',
          index: -1,
          options: [
            {
              label: '未作废',
              value: '0'
            },
            {
              label: '已作废',
              value: '1'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getCategoryType()
  },
  methods: {
    checkSecondCate(item, index) {
      this.secondCateIndex = index
      this.search()
    },
    async checkFirstCate(item, index) {
      let { categoryCode } = item
      this.firstCateIndex = index
      this.secondCateIndex = -1
      if (categoryCode) this.getCategoryTwo(categoryCode)
      else {
        this.secondCateList = []
        this.search()
      }
    },
    async getCategoryType() {
      let res = await this.$api.work.firstcategory()
      this.firstCateList = res.items || []
      this.firstCateList.unshift({
        parentCode: '',
        categoryCode: '',
        categoryName: '全部',
        unitList: ''
      })
    },
    async getCategoryTwo(code) {
      let params = {
        data: {
          parentCode: code
        }
      }
      let res = await this.$api.work.secondcategory(params)
      this.secondCateList = res.items || []
    },
    filterClick(item, sindex) {
      if (item.index === sindex) return (item.index = -1)
      item.index = sindex
    },
    confirm(index, item) {
      this.selectIndex[this.setNavIndex] = index
      this.search()
    },
    DateChange(e, index) {
      this.proDate[index - 1] = e.mp.detail.value
      // 防止对象引用问题
      this.proDate = this.proDate.slice()
    },
    search() {
      if (`${this.proDate[0]} 00:00:00` > `${this.proDate[1]} 23:59:59`)
        return mpvue.showToast({
          icon: 'none',
          title: '结束日期必须大于开始日期'
        })
      let delFlagObj = this.tabList[0].options[this.tabList[0].index] || ''
      let form = {
        warehouseName: this.wareList[this.selectIndex[0]].warehouseName,
        warehouseNo: this.wareList[this.selectIndex[0]].warehouseId,
        status: this.statusList[this.selectIndex[2]].value,
        statusName: this.statusList[this.selectIndex[2]].label,
        delFlag: delFlagObj.value || '',
        creBeginTime: `${this.proDate[0]} 00:00:00`,
        creEndTime: `${this.proDate[1]} 23:59:59`
      }
      this.firstCateIndex > 0 &&
        this.secondCateIndex >= 0 &&
        Object.assign(form, {
          firstCategory: this.firstCateList[this.firstCateIndex].categoryCode,
          secondCategory: this.secondCateList[this.secondCateIndex].categoryCode
        })
      this.$emit('confirm', form)
    },
    reset() {
      this.proDate = [
        formatTime(+new Date() - 3600 * 6 * 24 * 1000, 'YYYY-MM-DD'),
        formatTime(new Date(), 'YYYY-MM-DD')
      ]
      this.tabList.map(v => {
        v.index = -1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.incrementItem-container {
  width: 100%;
  height: 460rpx;
  background: #fff;
  position: absolute;
  top: 80rpx;
  left: 0;
  width: 100%;
  z-index: 100;
  .select-ul {
    height: 100%;
    text-align: left;
    padding: 0 60rpx;
    overflow: auto;
    .select-li {
      line-height: 100rpx;
    }
  }
  .batch-foolter {
    position: absolute;
    bottom: 20rpx;
    left: calc(50% - 130px);
  }
}
.cu-form-group {
  padding: 0 60rpx;
  flex-wrap: wrap;
  .group-label {
    width: 100%;
    height: 60rpx;
    line-height: 100rpx;
  }
  .group-input {
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 1rpx solid #f1f1f1;
  }
  .width20 {
    width: 40rpx;
  }
  picker {
    height: 90rpx;
    &::after {
      display: none;
    }
    .picker {
      height: 90rpx;
      text-align: left;
      border-bottom: 1rpx solid #f1f1f1;
    }
  }
}
.prd-flex {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.prd-filter {
  padding: 0 60rpx;
  .filter-title {
    height: 80rpx;
    line-height: 80rpx;
  }
}
.increment-div {
  height: 100%;
  width: 100%;
  display: flex;
  .select-ul {
    width: 50%;
    &:nth-of-type(2) {
      border-left: 1rpx solid rgb(243, 241, 241);
    }
  }
}
</style>