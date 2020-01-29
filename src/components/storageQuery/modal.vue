<template>
  <div class="cu-modal" :class="showModal?'show':''" @tap="close" @touchmove.stop.prevent="doCancel">
    <div class="cu-dialog bg-white padding-60" @tap.stop="">
      <!-- 单选 -->
      <radio-group class="block" @change="RadioChange" v-if="type==='radio'">
        <div class="cu-list menu text-left">
          <div class="cu-item" v-for="(item,index) in tabList" :key="index">
            <label class="flex justify-between align-center flex-sub">
              <div class="flex-sub">{{item.label}}</div>
              <!-- 修改选中的样式 -->
              <span class="icon-check text-green fontSize-24" v-if="checkVal===item.value"></span>
              <radio class="round" :value="item.value" :checked="checkVal===item.value" v-show="false"></radio>
            </label>
          </div>
        </div>
      </radio-group>
      <!-- 展示 -->
      <div class="cu-bar justify-end" v-if="type==='list'">
        <div class="content text-green">商品条码</div>
      </div>
      <scroll-view scroll-y="true" style="max-height: 400px" v-if="type==='list'">
        <div class="padding border-dash texts-left content-888" v-for="(item,index) in listData" :key="index">
          <text selectable='true'>{{item}}</text>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['showModal', 'type', 'listData'],
  data () {
    return {
      tabList: [{
        label: '总库存',
        value: 'totalStorage'
      }, {
        label: '仓库库存',
        value: 'WareStorage'
      }, {
        label: '批次库存',
        value: 'batchStorage'
      }],
      checkVal: 'totalStorage'
    }
  },
  methods: {
    doCancel (e) { return false },
    RadioChange (val) {
      this.checkVal = val.mp.detail.value
      this.$emit('confirm', val.mp.detail.value)
      this.close()
    },
    close () {
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="less" scoped>
.border-dash:last-of-type{
  border-bottom:1rpx dashed #F1F1F1
}
</style>