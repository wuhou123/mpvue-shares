<template>
  <section class="storageCard-config">

      <div class="bg-white mt20" v-for="(item,index) in cardList" :key="index">
        <div class="cu-bar">
          <div class="action">
            <span class="icon-titles text-green"></span>
            <text class="text-bold" selectable='true'>{{item.productShortName || '-'}}</text>
          </div>
          <div class="action" v-if="storageType==='batchStorage'">
            <span class='cu-tag light round' :class="bgTypes[item.warrantyLabel]" v-if="item.warrantyLabel>0">{{warrantyLabelTypes[item.warrantyLabel]}}</span>
          </div>
        </div>
        <div class="product-div text-666">
          <p>
            <span class="content-888">商品条码：</span>
            <text selectable='true'>{{item.pns[0] || '-'}}</text>
            <span class="iconfont icon-more fontSize-32 ml10" v-if="item.pns.length>1" @click="showPns(item)"></span>
          </p>
          <div class="prd-flex">
            <p :class="storageType!=='totalStorage'?'span-52':''">
              <span class="content-888">商品编码：</span>
              <text>{{item.extendid || '-'}}</text>
            </p>
            <p class="span-48" v-if="storageType!=='totalStorage'">
              <span class="content-888 ml40">仓库名：</span>
              {{item.warehousename}}              
            </p>
          </div>

          <div class="prd-flex">
            <span class="span-52">
              <span class="content-888">总量：</span>
              <span class="font-DIN">{{item.aqty||0}}</span>
              {{item.uomname||''}}
            </span>
            <span class="span-48">
              <span class="content-888 ml40">可用：</span>
              <span class="font-DIN">{{item.vqty}}</span>
              {{item.uomname||''}}
            </span>
            <span class="span-52">          
              <span class="content-888">冻结：</span>
              <span class="font-DIN">{{item.hqty}}</span>
              {{item.uomname||''}}
            </span>
            <span class="span-48">
              <span class="content-888 ml40">占用：</span>
              <span class="font-DIN">{{item.oqty}}</span>
              {{item.uomname||''}}
            </span>
            <!-- 批次库存的日期 -->
            <template v-if="storageType==='batchStorage'">
              <span class="span-52">          
                <span class="content-888">生产日期：</span>
                <span class="font-DIN">{{item.productDate||'-'}}</span>
              </span>
              <span class="span-48">
                <span class="content-888 ml40">到期日期：</span>
                <span class="font-DIN">{{item.expiryDate||'-'}}</span>
              </span>
            </template>
          </div>
          <div class="prd-flex pt15 mt30 text-green border-top">
            <span>
              <span class="icon-roundcheck mr-5"></span>
              {{tempTypes[item.tempraturetype] || '-'}}
            </span>
            <span>
              <span class="icon-roundcheck mr-5"></span>
              {{item.stockplacename || '-'}}
              </span>
            <span>
              <span class="icon-roundcheck mr-5"></span>
              {{item.shelflifehour || '-'}}天
              </span>
          </div>
        </div>
      </div>

      <!-- 商品条码弹出框 -->
      <dialog-modal 
      :showModal="showModal"
      @close="showModal=false"
      :listData="listData"
      type="list"/>
  </section>
</template>

<script>
import dialogModal from '@/components/storageQuery/modal'

export default {
  name: 'storageCard',
  props: ['storageType', 'cardList'],
  components: {
    dialogModal
  },
  data () {
    return {
      stockTypes: {
        'NORMAL': '正品',
        'GIFT': '赠品',
        'DAMAGE': '残品',
        'GQ': '过期'
      },
      tempTypes: {
        LC: '冷藏',
        LD: '冷冻',
        CW: '常温'
      },
      warrantyLabelTypes: ['', '质保期', '已临期', '禁售期', '已过期'],
      bgTypes: ['', 'bg-blue', 'bg-yellow', 'bg-grey', 'bg-red'],
      showModal: false,
      listData: []
    }
  },
  onLoad () {
    this.showModal = false
  },
  methods: {
    showPns (item) {
      this.showModal = true
      this.listData = item.pns || []
    }
  }
}
</script>

<style lang="less" scoped>
.product-div{
  height:100%;
  padding:20rpx 0;
  margin:0 35rpx;
  background:#fff;
  border-top:1rpx solid #F1F1F1;
  line-height:60rpx;
  .prd-flex{
    display:flex;
    justify-content: space-between;
    align-items:center;
    flex-wrap: wrap;
    .span-52{
      width:52%
    }
    .span-48{
      width:48%
    }
  }
}
</style>