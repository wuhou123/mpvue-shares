<template>
 <span class="number-grow">{{count}}</span>
</template>
<script>
export default {
  name: 'numberGrow',
  data () {
    return {
      count: 0
    }
  },
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 100
    }
  },
  watch: {
    value (val) {
      this.count = 0
      this.numberGrow()
    }
  },
  methods: {
    numberGrow () {
      let _this = this
      let step = (_this.value * 10) / (_this.time * 1000)
      let current = 0
      let start = 0
      let t = setInterval(function () {
        start += step
        if (start > _this.value) {
          clearInterval(t)
          start = _this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        _this.count = parseInt(current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,'))
      }, 10)
    }
  },
  mounted () {
    this.numberGrow()
  }
}
</script>