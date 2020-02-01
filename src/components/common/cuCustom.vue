<template>
	<div class="cus-config" :class="isAbsolute?'absolute':''">
		<div class="cu-custom" :style="[{height:getCustomBar + 'px'}]">
			<div class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<div class="action" @tap="BackPage" v-if="isBack">
					<text class="icon-back"></text>
					<span name="backText">返回</span>
				</div>
				<div class="content" style="top:60rpx">
					<div name="content">{{titleText}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      getCustomBar: 65,
      style: ''
    }
  },
  name: 'cu-custom',
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    isAbsolute: {
      type: Boolean,
      default: false
    },
    titleText: {
      type: String,
      default: ''
    }
  },
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad() {
    this.getCustomBar = this.$store.state.customerHeight[1]
    let StatusBar = this.$store.state.customerHeight[0]
    let CustomBar = this.$store.state.customerHeight[1]
    let style = `height:${CustomBar}px;padding-top:${StatusBar}px;`
    this.style = style
  }
}
</script>

<style lang='less'>
.absolute {
  position: absolute;
  top: 0;
  left: 0;
}
.cu-custom {
  height: 65px;
  .cu-bar {
    height: 65px;
    padding-top: 20px;
  }
}
</style>
