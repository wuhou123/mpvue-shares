<template>
  <div></div>
</template>

<script>
import Request from '@/api/allApi'
import { SET_LOGIN, SET_CODE , SET_USERINFO} from '../../store/mutation-types'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },

  methods: {
    ...mapMutations({
        setLogin: 'SET_LOGIN',
        setCode: 'SET_CODE',
        setUserInfo: 'SET_USERINFO'
    })
  },

  onLoad(){}

}
</script>

<style lang='less' scoped>
</style>
