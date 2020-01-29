<template>
  <section class='select-container' v-show="show">
    <div class="select-div" v-if="setNavIndex==0">
      <ul class="select-ul">
        <li class="select-li"
        @click="selectLeft"
        :class="changeIndexTrans===2?'active':''"
        >默认</li>
        <li class="select-li"
        :class="changeIndexTrans===index?'active':''" 
        @click="changeFirstIndex(index)"
        v-for="(item,index) in tabs"
        :key="index"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="select-div" :class="setNavIndex!=0?'signConfig':''">
      <ul class="select-ul">
        <li class="select-li" 
        v-for="(item,index) in tabList[setNavIndex]"
        :key="index" 
        @click="selectRight(index)"
        :class="changeIndexTransRight==index?'active':''">{{item.label}}</li>
      </ul>
    </div>
</section>
</template>

<script>
export default {
  name: 'select',
  props: ['setNavIndex', 'show', 'productList'],
  data () {
    return {
      tabs: ['整车', '零担'],
      setIndexs: {
        '0': {
          setLeftIndex: 2,
          setRightIndex: 0
        },
        '1': {
          setRightIndex: 0
        },
        '2': {
          setRightIndex: 0
        }
      },
      tabList: {
        '0': [{label: '不限'}],
        '1': [{
          label: '默认',
          id: ''
        }, {
          label: '从低到高',
          id: ''
        }, {
          label: '从高到低',
          id: ''
        }],
        '2': [{
          label: '默认',
          id: ''
        }
        // {
        //   label: '起步价 从低到高',
        //   id: ''
        // }, {
        //   label: '起步价 从高到低',
        //   id: ''
        // }
        ]
      }
    }
  },
  computed: {
    setLeftIndex () {
      return this.setIndexs[0].setLeftIndex
    },
    changeIndexTrans () {
      if (this.setNavIndex < 0) return 2
      return this.setIndexs[this.setNavIndex].setLeftIndex
    },
    changeIndexTransRight () {
      if (this.setNavIndex < 0) return 0
      return this.setIndexs[this.setNavIndex].setRightIndex
    }
  },
  watch: {
    setLeftIndex (val) {
      if (val === 2) {
        this.tabList['0'] = [{label: '不限'}]
        return
      }
      this.setIndexs[0].setRightIndex = 0
      this.tabList['0'] = this.productList[val] || []
    }
  },
  methods: {
    changeFirstIndex (index) {
      this.setIndexs[this.setNavIndex].setLeftIndex = index
    },
    selectLeft () {
      this.setIndexs[this.setNavIndex].setLeftIndex = 2
      this.setIndexs[0].setRightIndex = 0
      this.selectRight()
    },
    selectRight (index) {
      if (this.setIndexs[this.setNavIndex].setLeftIndex === 2) return this.$emit('confirm', '', this.setIndexs[0].setLeftIndex)
      this.setIndexs[this.setNavIndex].setRightIndex = index
      // 处理筛选逻辑
      switch (this.setNavIndex) {
        case 0:
          this.$emit('confirm', this.productList[this.setLeftIndex][index].productName, this.setIndexs[0].setLeftIndex)
          break
        case 1:
        case 2:
          this.$emit('confirm', index)
          break
      }
    }
  },
  onLoad () {
    this.setIndexs = {
      '0': {
        setLeftIndex: 2,
        setRightIndex: 0
      },
      '1': {
        setRightIndex: 0
      },
      '2': {
        setRightIndex: 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.select-container{
  width:100%;
  height:480rpx;
  background:#fff;
  position:absolute;
  top:80rpx;
  left:0;
  width:100%;
  z-index:99;
  .select-div{
    width:25%;
    height:auto;
    display:inline-flex;
    text-align: center;
    float:left;
    .select-li{
      border-left:2px solid #fff
    }
    .select-li.active{
      color:#00C188;
      border-color:#00C188
    }
    &:last-of-type{
      width:75%;
      padding:0 40rpx;
      justify-content: flex-start;
      background:#F5F5F5;
      height:100%;
      overflow:auto;
      .select-li{
        text-align: left;
        border-left:none
      }
      .select-li.active{
        color:#00C188;
        border-left:none
      }
    }
    .select-ul{
      width:100%;
      .select-li{
        width:100%;
        height:100rpx;
        line-height:100rpx;
      }
    }
    &.signConfig{
      width:100%;
      background:#fff;
    }
  }
}
</style>
