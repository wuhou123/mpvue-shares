<template>
  <div class="user-center">
    <div class='user-info bg-white gap'>
      <div class='user-info-avatar'>
        <open-data type='userAvatarUrl' />
      </div>
      <div class='user-info-detail'>
        <open-data type='userNickName'
                   lang="zh_CN"
                   class="setName" />
      </div>
    </div>
    <div class="cu-bar bg-white solid-bottom">
      <div class='action'>
        <text class='icon-titles text-orange'></text> 越运动越幸运
      </div>
    </div>
    <!--金币-->
    <div class="coin-cont">
      <!-- 左上角区域==== -->
      <view class="todayRunData">
        <view class="todayData">
          <text>今日步数</text>
          <view class="todaywalk">{{ExpectData.TodayWalk}}</view>
        </view>
      </view>
      <!-- 右上角区域==== -->
      <view class="recordCont"
            :style="{'animation-name':isAni?'mymoves':''}">
        <view class="collect">
          <view class="coinRecord">
            <view class="CLeft">
              <image src="../../static/imgs/coinRecord.png"></image>
              <text class="record">股运</text>
            </view>
            <text class="moneyCount">{{ExpectData.total}}</text>
          </view>
        </view>
      </view>
      <div class="coin-bg"
           :style="{'animation-name':ShopShakeType?'mymoves':''}">
      </div>
      <div v-for="(v,index) in CoinList"
           :key="index">
        <div class="coin"
             :style="{'right':v.right+'px','top':v.top+'px','opacity':v.opacity,'transform':'translate('+v.translateX+'px,'+v.translateY+'px)'}"
             @click.stop="CoinClick(v,index)"
             v-show="v.showType">
          <div class="coinConten">
            <image :src="v.ImgUrl" />
            <button class="getFormeId"></button>
          </div>
        </div>
      </div>
    </div>
    <div class="radius shadow-blur margin1">
      <image src="https://image.weilanwl.com/gif/wave.gif"
             mode="scaleToFill"
             class="gif-blue response"
             style="height:100rpx"></image>
    </div>
  </div>
</template>

<script>
import Request from '@/api/allApi'
import { RandomNum, formatDate } from "@/utils/index"
import WXBizDataCrypt from '@/utils/RdWXBizDataCrypt'

export default {
  data () {
    return {
      ShopShakeType: false,
      CoinList: [],
      getObj: {},
      coin: {
        width: 148,
        height: 160
      },
      appid: 'wx64b1735b4eb0b71d',
      secret: 'e648211b2e89e87fd554bb7292eb3b75',
      ExpectData: {
        TodayWalk: 0,
        currency: 0,
        timestamp: 0,
        total: 0
      },
      isAni: false,
      openid: '',
      audio: ''
    }
  },

  methods: {
    CoinClick (v, index) {
      this.CoinList[index].translateY = `-${this.CoinList[index].top / 2}`
      this.CoinList[index].translateX = `${this.CoinList[index].right - 180}`
      this.CoinList[index].opacity = 0
      this.ShopShakeType = true
      this.isAni = true
      //播放音频
      this.audio.seek(0)
      this.audio.play()
      //金币提交
      this.ExpectData.currency++
      this.ExpectData.total++
      this.sumbmitRunData(this.openid, this.ExpectData)
      setTimeout(() => {
        this.CoinList.map(v => {
          this.ShopShakeType = false
          this.isAni = false
          this.CoinList[index].showType = false
        })
      }, 500)
    },
    CoinsRender (CoinAry) {
      const _this = this
      wx.createSelectorQuery().selectAll('.coin-cont').boundingClientRect(function (rects) {
        rects.forEach(function (rect) {
          rect.id      // 节点的ID
          rect.dataset // 节点的dataset
          rect.left    // 节点的左边界坐标
          rect.right   // 节点的右边界坐标
          rect.top     // 节点的上边界坐标
          rect.bottom  // 节点的下边界坐标
          rect.width   // 节点的宽度
          rect.height  // 节点的高度
        })
        _this.getObj = {
          width: rects[0]['width'] * 2,
          height: rects[0]['height'] * 2
        }
      }).exec()
    },
    RandomMoneyMake (n, obj) {
      let lengths = parseInt(n)
      this.CoinList = []
      for (let i = 0; i < lengths; i++) {
        let v = {}
        v.translateX = 0
        v.translateY = 0
        v.opacity = 1
        v.right = RandomNum(10, (this.getObj.width - this.coin.width) / 2)
        v.top = RandomNum(10, (this.getObj.height - this.coin.height) / 2)
        v.ImgUrl = `../../static/imgs/coin${RandomNum(2, 6)}.png`
        v.showType = true
        this.CoinList.push(v)
      }
      console.log(n, this.CoinList)
    },
    getRunData () {
      let that = this
      wx.login({
        success: function (res) {
          let code = res.code
          that.getSessionKey(code)
        }
      })
    },
    getSessionKey (code) {
      let that = this
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getSessionKey', appid: that.appid, secret: that.secret, js_code: code, grant_type: 'authorization_code' }
      }).then(res => {
        wx.getWeRunData({//解密微信运动
          success (datas) {
            let encryptedData = datas.encryptedData
            let iv = datas.iv
            let pc = new WXBizDataCrypt(that.appid, res.result.home.session_key)
            let runData = pc.decryptData(encryptedData, iv) || []
            //今日步数
            let currentData = runData.stepInfoList[runData.stepInfoList.length - 1]
            that.ExpectData.TodayWalk = currentData.step
            that.ExpectData.timestamp = currentData.timestamp
            that.openid = res.result.home.openid
            //提交步数
            const db = wx.cloud.database()
            const run = db.collection('runDatas')
            run
              .where({
                openid: that.openid
              })
              .get()
              .then(response => {
                if (!response.data[0]) {
                  //新用户
                  that.sumbmitRunData(that.openid, that.ExpectData)
                  that.RandomMoneyMake(Math.ceil(that.ExpectData.TodayWalk / 1000), that.getObj)
                } else {
                  that.ExpectData.currency = response.data[0].items.currency || 0
                  if (formatDate(that.ExpectData.timestamp * 1000, 'yyyy-MM-dd') != response.data[0].items.date) {
                    response.data[0].items.currency = 0
                    that.resetCurrenty(that.openid, that.ExpectData)
                  }
                  that.ExpectData.total = response.data[0].items.total || 0
                  that.sumbmitRunData(that.openid, that.ExpectData, true)
                  let bites = Math.ceil(that.ExpectData.TodayWalk / 1000) - response.data[0].items.currency
                  if (bites > 0) that.RandomMoneyMake(bites, that.getObj)
                }
              })
              .catch(error => {
              })


          },
          fail (error) {
            wx.showModal({
              title: '提示',
              content: '开发者未开通微信运动，请关注“微信运动”公众号后重试',
              showCancel: false,
              confirmText: '知道了'
            })
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    async sumbmitRunData (openid, datas, type) {
      datas['date'] = formatDate(datas.timestamp * 1000, 'yyyy-MM-dd')
      let list = {
        openid: openid,
        items: datas
      }
      if (type) {
        initRunData
        wx.cloud.callFunction({
          name: 'reptile',
          data: { type: 'initRunData', list: list }
        }).then(res => {
          console.log('333', res)
        })
      } else {
        wx.cloud.callFunction({
          name: 'reptile',
          data: { type: 'upDateRunDate', list: list }
        }).then(res => {
          console.log('11111', res)
        })
      }

    },
    async resetCurrenty (openid, datas) {
      datas['date'] = formatDate(datas.timestamp * 1000, 'yyyy-MM-dd')
      let list = {
        openid: openid,
        items: datas
      }
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'resetCurrenty', list: list }
      }).then(res => {
        console.log('222', res)
      })
    }
  },
  onLoad () {
    //音频
    let res = wx.getSystemInfoSync()
    if (res.platform == 'ios') {
      this.audio = wx.getBackgroundAudioManager()
    } else {
      this.audio = wx.createInnerAudioContext();
    }
    this.audio.title = "音乐文件"
    this.audio.src = "https://www.wuhou123.cn/coin.mp3"
  },
  mounted () {
    this.CoinsRender()
    this.getRunData()
  }

}
</script>

<style lang='less' scoped>
@themeColor: #fee13c;
@marginLeft12: 12rpx;

.user-center {
  &-top {
    .user-settings {
      padding: 16px 24px;
      .user-icon-right {
        float: right;
        margin-right: 20rpx;
      }
      .settings {
        margin-right: 40px;
      }
      .clearfix:after {
        content: "";
        display: block;
        clear: both;
      }
    }
  }
  .user-info {
    display: flex;
    height: 210rpx;
    padding: 10px 0 0 40px;
    &-avatar {
      overflow: hidden;
      display: block;
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    }
    &-detail {
      display: flex;
      align-items: center;
      margin-left: 10rpx;
      height: 160rpx;
    }
  }
  .gap {
    margin-bottom: 5px;
  }
  // .bottom-tab {
  //     margin-bottom: 150px;
  // }
  .at-list__item .item-extra__info {
    max-width: 200px;
  }
}
.setName {
  font-size: 32rpx;
}
.user-info-avatar image {
  border-radius: 50%;
}
.set-bg {
  margin-top: -80rpx;
}
.coin-bg {
  width: 100%;
  height: 500rpx;
  background: url("https://i.loli.net/2019/05/08/5cd26cd36a4c8.png") no-repeat
    center;
  background-size: 50% 80%;
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
  animation-delay: 0s;
  animation-play-state: running;
}

@keyframes shake-rotate {
  0% {
    transform: scale(1.3, 0.9);
  }
  20% {
    transform: scale(1.1, 1);
  }
  40% {
    transform: scale(1.15, 0.9);
  }
  80% {
    transform: scale(1.05, 1);
  }
  90% {
    transform: scale(1, 0.99);
  }
  95% {
    transform: scale(1.03, 0.99);
  }
  100% {
    transform: scale(1);
  }
}
.coin-cont {
  // 预留头部容器位置
  // padding-top: 80rpx;
  // padding-bottom: 150rpx;
  height: 500rpx;
  width: 100%;
  position: relative;
  // background-image: linear-gradient(
  //   to bottom,
  //   #9370db 0%,
  //   #9370db 40%,
  //   #537895 60%,
  //   #333 80%,
  //   #000 100%
  // );
  background-image: linear-gradient(
    to bottom,
    #3ab5b0 0%,
    #3d99be 20%,
    #56317a 60%,
    #000000 100%
  );
  .coin {
    z-index: 2;
  }
  .todayRunData {
    width: 200rpx;
    height: 500rpx;
    position: absolute;
    top: 20rpx;
    left: 42rpx;
    .profile {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      float: left;
      margin-right: 29rpx;
      position: relative;
      top: 20rpx;
    }
    .todayData {
      width: 200rpx;
      height: 100rpx;
      text {
        font-family: PingFang-SC-Medium;
        font-size: 26rpx;
        color: #ffffff;
        letter-spacing: 0;
      }
      .todaywalk {
        font-family: PingFangSC-Semibold;
        font-size: 40rpx;
        color: #ffffff;
        letter-spacing: 0;
      }
    }
    .FdZanZhu {
      width: 200rpx;
      height: 100rpx;
      text {
        font-family: PingFang-SC-Medium;
        font-size: 26rpx;
        color: #ffffff;
        letter-spacing: 0;
      }
      .todaywalk {
        font-family: PingFangSC-Semibold;
        font-size: 40rpx;
        color: #ffffff;
        letter-spacing: 0;
      }
    }
    button::after {
      border: none;
    }
    .cbsiconCont {
      margin-top: 14rpx;
      /*width: 154rpx;*/
      /*height: 143rpx;*/
      width: 85rpx;
      height: 72rpx;
      /*  margin-left: -40rpx;*/
      margin-left: -20rpx;
      background: rgba(0, 0, 0, 0);
      .cbsicon {
        width: 67rpx;
        height: 72rpx;
        /*width: 136rpx;*/
        /*height: 143rpx;*/
        /*  margin-left: -28rpx;*/
        margin-left: -15rpx;
      }
    }
    .xm_fixed {
      position: absolute;
      bottom: 0;
      left: 0rpx;
      width: 100rpx;
      height: 100rpx;
      .xm_inner {
        position: absolute !important;
        width: 100rpx !important;
        height: 100rpx !important;
        bottom: 0 !important;
        right: 0 !important;
      }
    }
  }
  .recordContS {
    position: absolute;
    right: 0;
    top: 32rpx;
    background-color: rgba(198, 243, 245, 0.22);
    min-width: 230rpx;
    height: 74rpx;
    border-radius: 40rpx 0 0 40rpx;
    .go-login-cont {
      position: relative;
      height: 100%;
      width: 100%;
      .go-login-desc {
        color: #ffffff;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30rpx;
      }
      button {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
  @keyframes mymoves {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(1.2);
    }
    25% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(1);
    }
    // 100% {transform:scale(1)}
  }

  @-webkit-keyframes mymoves /*Safari and Chrome*/ {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(1.2);
    }
    25% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(1);
    }
    // 100% {transform:scale(1)}
  }
  .recordCont {
    position: absolute;
    right: 34rpx;
    top: 32rpx;
    // background-color: rgba(198,243,245,0.22);
    background: rgba(198, 243, 245, 0.22);
    height: 54rpx;
    border-radius: 18rpx;
    // animation-name: mymoves;
    animation-duration: 800ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    animation-delay: 0.4s;
    animation-play-state: running;
  }
  .collect {
    min-width: 270rpx;
    padding: 0 20rpx;
    height: 100rpx;
    // padding:0 22rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .record {
      width: 100%;
      font-family: PingFang-SC-Medium;
      color: #ffffff;
      font-size: 24rpx;
      margin: 0;
      margin-left: 5rpx;
      line-height: 52rpx;
      // margin-top: 1rpx;
    }
    .coinRecord {
      width: 100%;
      // display: flex;
      // align-items: center;
      // justify-content:space-around;
      margin-top: 5rpx;
      .CLeft {
        float: left;
        image {
          width: 28rpx;
          height: 28rpx;
          // margin:2rpx 0 0 0;
          vertical-align: middle;
          margin-right: 19rpx;
        }
        .record {
          margin-right: 18rpx;
        }
      }
      .moneyCount {
        float: right;
        font-family: PingFangSC-Semibold;
        color: #ffffff;
        font-size: 24rpx;
        line-height: 52rpx;
        vertical-align: middle;
      }
    }
    .luckyRecord {
      width: 100%;
      margin-top: -5rpx;
      .CLeft {
        float: left;
        image {
          width: 25rpx;
          height: 28rpx;
          vertical-align: middle;
          margin-right: 19rpx;
        }
        .record {
          margin-right: 18rpx;
        }
      }
      .luckyCount {
        float: right;
        font-family: PingFangSC-Semibold;
        color: #ffffff;
        font-size: 24rpx;
        line-height: 52rpx;
        margin: 0;
        // margin-left: 4rpx;
      }
    }
  }
  .go-login-cont {
    position: relative;
    height: 100%;
    width: 230rpx;
    .go-login-desc {
      color: #ffffff;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
    }
    button {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      height: 100%;
      width: 100%;
    }
  }
  .homeBgimg {
    position: absolute;
    top: 0;
    left: 0;
    height: 1030rpx;
    width: 750rpx;
  }
  // .home-bgimg{
  //   position: absolute;
  //   top:0;
  //   left:0;
  //   height:1030rpx;
  //   width:750rpx;
  // }
  .today-bushu-cont {
    position: absolute;
    color: #ffffff;
    top: 20rpx;
    left: 42rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .bushu-count {
      color: #ffffff;
      font-size: 40rpx;
      font-weight: 500;
      text-shadow: 4rpx 4rpx 4rpx #666666;
    }
    .bushu-desc {
      margin-top: 8rpx;
      font-size: 24rpx;
      color: #ffffff;
      letter-spacing: 0;
    }
  }
  .money-cont {
    position: absolute;
    right: 0;
    top: 20rpx;
    display: flex;
    align-items: center;
    min-width: 230rpx;
    height: 74rpx;
    // background: rgba(23, 109, 185,0.5);
    background: rgba(129, 247, 255, 0.24);
    border-radius: 40rpx 0 0 40rpx;
    .user-head {
      width: 60rpx;
      height: 60rpx;
      border-radius: 100%;
      border: 2rpx solid #ffffff;
      margin-left: 10rpx;
    }
    .money-icon {
      width: 16.8rpx;
      height: 25.6rpx;
      margin-left: @marginLeft12;
    }
    .money-count {
      // margin-left:@marginLeft12;
      font-size: 28rpx;
      color: #ffffff;
      letter-spacing: 0;
    }
    .duihuan-btn {
      margin-left: @marginLeft12;
      font-size: 25rpx;
      color: #ffffff;
      letter-spacing: 0;
      padding: 8rpx 15rpx;
      background-image: linear-gradient(-154deg, #78c5f8 0%, #629bf3 100%);
      border-radius: 100rpx;
      margin-right: 18rpx;
    }
    .go-login-cont {
      position: relative;
      height: 100%;
      width: 100%;
      .go-login-desc {
        color: #ffffff;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30rpx;
      }
      button {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
  .coin-btn-adver {
    position: absolute;
    top: 153rpx;
    right: 0rpx;
    width: 200rpx;
    height: 600rpx; // ====
  }
  .coin-btn-cont {
    position: absolute;
    bottom: 63rpx;
    /*bottom:23rpx;*/
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    view {
      position: relative;
      // opacity: 0.75;
      // background-image: linear-gradient(-180deg, rgba(178,226,252,0.30) 50%, #69BEFF 100%);
      // box-shadow: 0 2rpx 4rpx 0 #A8EFFF, inset 0 0 10rpx 0 rgba(186,247,255,0.50);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      border-radius: 100%;
      .gotologinBtn {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
    .vip-btn {
      position: relative;
      margin-left: 40rpx;
    }
    .gonglue-btn {
      margin-left: 30rpx;
    }
    .vip-btn,
    .gonglue-btn {
      color: #ffffff;
      width: 75rpx;
      height: 75rpx;
    }
    .invit-btn-shop {
      /*margin-left: -50rpx;*/
      .shop-btn-img {
        /*width: 210rpx;*/
        /*height: 173rpx;*/
        width: 96rpx;
        height: 96rpx;
      }
    }
    .invit-btn {
      // margin-left: 390rpx;
      // margin-left:470rpx;
      margin-left: 300rpx;
      // width: 154rpx;
      // height: 154rpx;
      width: 194rpx !important;
      height: 165rpx;
      position: relative;
      #bubu {
        width: 194rpx !important;
        height: 165rpx;
        display: block;
      }
      .invit-btn-img {
        width: 154rpx;
        height: 154rpx;
      }
      .inviteBtn {
        width: 96rpx;
        height: 96rpx;
        position: absolute;
        top: center;
        left: center;
        z-index: 2;
      }
      .inviteBtn1,
      .inviteBtn2 {
        width: 79.68rpx;
        height: 96rpx;
        position: absolute;
        top: center;
        left: center;
        margin-right: 16rpx;
        opacity: 0.5;
        z-index: 0;
        -webkit-animation: shake 3.5s linear infinite;
        animation: shake 3.5s linear infinite;
      }
      .inviteBtn2 {
        -webkit-animation-delay: 1.75s;
        animation-delay: 1.75s;
      }
      @keyframes shake {
        0% {
          transform: scale(1);
          opacity: 0.3;
        }
        50% {
          transform: scale(1.4);
          opacity: 0; /*圆形放大的同时，透明度逐渐减小为0*/
        }
        100% {
          transform: scale(1);
          opacity: 0.3;
        }
      }

      .invit-btn-desc {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        height: 100%;
        width: 100%;
        font-size: 24rpx;
      }
    }
  }
  .coins {
    // border-radius: 100%;
    transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
    .coinConten {
      // border-radius: 100%;
      height: 100%;
      width: 100%;
      // animation:mymove 2s infinite alternate;
      // -webkit-animation:mymove 2s infinite alternate;
      // border: 1rpx solid red;
      // background: red;
      .adEnter {
        width: 148rpx;
        height: 160rpx;
        position: relative;
        top: 40rpx;
        right: 30rpx;
      }
      .getFormeId {
        position: absolute;
        top: 0;
        width: 148rpx;
        height: 160rpx;
        opacity: 0;
      }
      image {
        width: 148rpx;
        height: 160rpx;
        /*width: 240rpx;*/
        /*height: 240rpx;*/
      }
    }
  }
  .coin {
    // width: 40rpx;
    // height: 40rpx;
    // background: red;
    border-radius: 100%;
    position: absolute;
    transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);

    .coinConten {
      // border: 1rpx solid red;
      // background: red;
      .adEnter {
        width: 100rpx;
        height: 80rpx;
        position: relative;
        top: 40rpx;
        right: 30rpx;
      }
      .getFormeId {
        position: absolute;
        top: 0;
        width: 168rpx;
        height: 168rpx;
        opacity: 0;
      }
      border-radius: 100%;
      height: 100%;
      width: 100%;
      animation: mymove 2s infinite alternate;
      -webkit-animation: mymove 2s infinite alternate;
      image {
        width: 168rpx;
        height: 168rpx;
        /*width: 240rpx;*/
        /*height: 240rpx;*/
      }
    }
  }

  @keyframes mymove {
    from {
      transform: translateY(30rpx);
    }
    to {
      transform: translateY(0rpx);
    }
  }

  @-webkit-keyframes mymove /*Safari and Chrome*/ {
    from {
      transform: translateY(30rpx);
    }
    to {
      transform: translateY(0rpx);
    }
  }
}
.margin1 {
  margin-top: -1px;
}
</style>
