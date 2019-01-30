<template>
  <div>测试</div>
</template>

<script>
import Request from "@/api/allApi";
import { SET_LOGIN, SET_CODE, SET_USERINFO } from "../../store/mutation-types";
import { mapMutations } from "vuex";

export default {
  data () {
    return {};
  },

  methods: {
    ...mapMutations({
      setLogin: "SET_LOGIN",
      setCode: "SET_CODE",
      setUserInfo: "SET_USERINFO"
    })
  },
  onLoad () { },
  onShow () { },

  async onPullDownRefresh () { },

  // 上拉加载，拉到底部触发
  onReachBottom () { }
};
</script>

<style scoped lang="less">
</style>
