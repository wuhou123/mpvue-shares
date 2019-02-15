<template>
  <div class="container skeletons">
    <div class="author skeletons-circle">
      Titan_star
    </div>
    <div class="skeletons-rect">
      <p>
        首屏渲染-小程序骨架屏动态注入组件
      </p>
    </div>
    <div class="usermotto">
      <p class="skeletons-rect">Hello skeletons</p>
    </div>
    <skeletons :is_capture_nodes="is_capture_nodes"
               :is_complete="is_complete"
               loading="music"
               block_animation="shine"
               selector="skeletons"
               background="#fff" />
  </div>
</template>

<script>
import Request from "@/api/allApi";
import { SET_LOGIN, SET_CODE, SET_USERINFO } from "../../store/mutation-types";
import { mapMutations } from "vuex";

export default {
  data () {
    return {
      is_capture_nodes: false,
      is_complete: false
    }
  },

  methods: {
    ...mapMutations({
      setLogin: "SET_LOGIN",
      setCode: "SET_CODE",
      setUserInfo: "SET_USERINFO"
    }),
    getList () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('完成')
        }, 5000)
      })
    },
    async init () {
      let complete = await this.getList()
      console.log(complete)
      this.is_complete = true
    }
  },
  onLoad () {
    this.is_capture_nodes = true
    this.init()
  },
  onShow () { },

  async onPullDownRefresh () { },

  // 上拉加载，拉到底部触发
  onReachBottom () { }
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.author {
  width: 200rpx;
  height: 200rpx;
  line-height: 200rpx;
  border-radius: 100%;
  background: #111;
  margin: 30rpx auto;
  font-size: 32rpx;
  text-align: center;
  color: #fff;
}
</style>
