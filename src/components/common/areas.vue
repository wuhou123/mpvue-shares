<template>
  <picker-view indicator-style="height: 50rpx;font-size:30rpx"
               class="picker-center"
               :value="region"
               @change="RegionChange">
    <picker-view-column>
      <div v-for="(items,indexs) in provinces"
           class="picker-item"
           :key="indexs">{{items}}</div>
    </picker-view-column>
    <picker-view-column>
      <div v-for="(items,indexs) in citys"
           class="picker-item"
           :key="indexs">{{items}}</div>
    </picker-view-column>
    <picker-view-column>
      <div v-for="(items,indexs) in areas"
           class="picker-item"
           :key="indexs">{{items}}</div>
    </picker-view-column>
  </picker-view>
</template>

<script>

export default {
  name: 'areas',
  props: {
    unlimited: { // 是否在区列插入[不限]
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      citysData: [],
      provinces: [],
      citys: [],
      areas: [],
      region: [0, 0, 0],
      value: [0, 0, 0]
    }
  },
  onLoad () {
    if (this.$store.state.citys && this.$store.state.citys.length > 0) {
      this.citysData = this.$store.state.citys
      this.initData()
    } else this.getList()
    // 模拟定位
    // let obj = {'mp': {'type': 'change', 'timeStamp': 5491, 'target': {'id': '', 'offsetLeft': 0, 'offsetTop': 201, 'dataset': {'comkey': '0_1', 'eventid': '0'}}, 'currentTarget': {'id': '', 'offsetLeft': 0, 'offsetTop': 201, 'dataset': {'comkey': '0_1', 'eventid': '0'}}, 'mark': {}, 'detail': {'value': [3, 4, 5]}}, 'type': 'change', 'timeStamp': 5491, 'target': {'id': '', 'offsetLeft': 0, 'offsetTop': 201, 'dataset': {'comkey': '0_1', 'eventid': '0'}, 'value': [1, 0, 0]}, 'currentTarget': {'id': '', 'offsetLeft': 0, 'offsetTop': 201, 'dataset': {'comkey': '0_1', 'eventid': '0'}}}
    // setTimeout(() => {
    //   this.RegionChange(obj)
    // }, 5000)
  },
  onUnload () {
    // 初始化参数
    Object.assign(this.$data, this.$options.data())
  },
  methods: {
    RegionChange (e) {
      let citysData = this.citysData
      let value = this.value
      let currentValue = e.mp.detail.value
      this.region = e.mp.detail.value
      let citys = []
      let provinceObj = {}
      let cityObj = {}
      provinceObj = citysData[currentValue[0]]
      if (value[0] !== currentValue[0]) {
        // 滑动省份
        provinceObj.citys.forEach((v) => {
          citys.push(v.name)
        })
        this.citys = citys
        let cityLength = provinceObj.citys.length
        // 城市超过滑动长度
        if (currentValue[1] >= cityLength) cityObj = provinceObj.citys[cityLength - 1]
        else cityObj = provinceObj.citys[currentValue[1]]
        if (this.unlimited && this.areas[0] !== '不限') cityObj.areas.unshift('不限')
        this.areas = cityObj.areas
        this.value = [currentValue[0], currentValue[1], 0]
      } else if (value[0] === currentValue[0] && value[1] !== currentValue[1]) {
        // 滑动城市 数据不存在 跳过
        if (currentValue[1] >= provinceObj.citys.length) return
        cityObj = provinceObj.citys[currentValue[1]]
        if (this.unlimited && this.areas[0] !== '不限') cityObj.areas.unshift('不限')
        this.areas = cityObj.areas
        this.value = [currentValue[0], currentValue[1], 0]
      } else {
        // 滑动区县
        cityObj = provinceObj.citys[currentValue[1]]
        this.value = currentValue
      }
      let name = [provinceObj.name, cityObj.name, this.areas[currentValue[2]]]
      this.$emit('change', name)
    },
    initData () {
      this.provinces = []
      this.citys = []
      this.areas = []
      this.citysData.forEach((province, i) => {
        this.provinces.push(province.name)
        if (i === 0) {
          this.citys.push(province.citys[i].name)
          this.areas = province.citys[i].areas.slice() // 拷贝
          if (this.unlimited) this.areas.unshift('不限')
        }
      })
    },
    getList () {
      let params = {
        data: {
          code_flag: 'province'
        }
      }
      mpvue.showLoading({ title: '加载地址中' })
      this.$api.work.regionLists(params).then(res => {
        mpvue.hideLoading()
        let provinceSourceDate = res.items || []
        let cityData = []
        provinceSourceDate.forEach((item) => {
          cityData.push([item.province, item.city, item.district])
        })
        // 省市区联动处理
        let cityArr = [...cityData, ['', '', '']]
        let obj = []
        let cityObj = {}
        cityArr.forEach((v, i) => {
          if (!cityArr[i + 1]) return
          // 省市-联动
          obj[v[1]] = obj[v[1]] || []
          !obj[v[1]].includes(v[2]) && obj[v[1]].push(v[2])
          // 市县-联动
          if (!cityObj[v[0]]) cityObj[v[0]] = []
          if (cityArr[i][1] !== cityArr[i + 1][1] && cityArr[i][0] === cityArr[i + 1][0]) {
            !cityObj[v[0]].includes(v[1]) && cityObj[v[0]].push(v[1])
          } else if (cityArr[i][1] !== cityArr[i + 1][1] && cityArr[i][0] !== cityArr[i + 1][0]) {
            !cityObj[v[0]].includes(v[1]) && cityObj[v[0]].push(v[1])
          }
        })
        // 获取树形结构数据
        let area = []
        for (let key in cityObj) {
          let getCitys = {
            name: key,
            citys: []
          }
          for (let j in cityObj[key]) {
            let getAreas = {
              name: cityObj[key][j],
              areas: obj[cityObj[key][j]]
            }
            getCitys.citys.push(getAreas)
          }
          area.push(getCitys)
        }
        this.citysData = area
        this.initData()
        this.$store.commit('SET_CITYS', area)
      }).catch(error => {
        mpvue.hideLoading()
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.picker-center {
  width: 100%;
  height: 600rpx;
  text-align: center;
  margin-top: -262rpx;
  .picker-item {
    line-height: 34px;
    color: #00c188;
  }
}
</style>
