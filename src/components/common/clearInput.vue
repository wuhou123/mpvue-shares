<template>
  <div class="clear-input">
    <div class="cu-bar search">
      <div class="search-form radius padding">
        <input @blur="InputBlur" :adjust-position="false" type="text" :placeholder="placeholder" confirm-type="search" v-model="inputVal"/>
        <span class="icon-roundclosefill" v-show="inputVal" @click="clear"></span>
        <span class="icon-search" @click="confirm"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'clearInput',
  props: ['placeholder', 'value'],
  data () {
    return {
      inputVal: '',
      hitDate: 0
    }
  },
  watch: {
    value (val) {
      if (val) this.inputVal = val
    }
  },
  methods: {
    clear () {
      this.inputVal = ''
      this.$emit('change', this.inputVal)
    },
    InputBlur (e) {
      this.$emit('change', this.inputVal)
      this.confirm()
    },
    confirm () {
      // 防抖
      let cureDate = +new Date() - this.hitDate
      this.hitDate = +new Date()
      if (cureDate < 300) return
      this.$emit('confirm', this.inputVal)
    }
  }
}
</script>

<style lang="less" scoped>
.clear-input{
  .cu-bar .search-form{
    height:96rpx;
    background:rgba(255,255,255,1);
    box-shadow:1px 2px 4px 0px rgba(0,0,0,0.24);
    border-radius:4px;
    font-size:36rpx;
    input{
      font-size:28rpx
    }
  }
  .icon-search{
    font-size:36rpx;
    border-left:1px solid #CCCCCC;
    padding-left:28rpx
  }
}

</style>
