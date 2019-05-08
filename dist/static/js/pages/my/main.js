global.webpackJsonp([4],{

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(126);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    "navigationBarTitleText": "",
    "enablePullDownRefresh": false
  }
});

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_04c1078a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(129);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(127)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-04c1078a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_04c1078a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\my\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-04c1078a", Component.options)
  } else {
    hotAPI.reload("data-v-04c1078a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 127:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_allApi__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_index__ = __webpack_require__(27);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      ShopShakeType: false,
      CoinList: [{
        right: 10,
        top: 20,
        translateY: 10,
        translateX: 20,
        opacity: 1,
        ImgUrl: '../../static/imgs/coin6.png'
      }, {
        right: 50,
        top: 20,
        translateY: 50,
        translateX: 20,
        opacity: 1,
        ImgUrl: '../../static/imgs/coin2.png'
      }, {
        right: 10,
        top: 50,
        translateY: 50,
        translateX: 10,
        opacity: 1,
        ImgUrl: '../../static/imgs/coin3.png'
      }, {
        right: 30,
        top: 30,
        translateY: 30,
        translateX: 30,
        opacity: 1,
        ImgUrl: '../../static/imgs/coin4.png'
      }, {
        right: 300,
        top: 30,
        translateY: 30,
        translateX: 30,
        opacity: 1,
        ImgUrl: '../../static/imgs/coin5.png'
      }],
      getObj: {},
      coin: {
        width: 148,
        height: 160
      }
    };
  },


  methods: {
    CoinClick: function CoinClick(v, index) {
      var _this2 = this;

      console.log(this.CoinList[index].right, this.CoinList[index].top);
      this.CoinList[index].right == 180 && (this.CoinList[index].right = 185);
      this.CoinList[index].translateY = '-' + this.CoinList[index].top / 2;
      this.CoinList[index].translateX = '' + (this.CoinList[index].right - 180);
      this.CoinList[index].opacity = 0;
      this.ShopShakeType = true;
      setTimeout(function () {
        _this2.CoinList.map(function (v) {
          _this2.ShopShakeType = false;
        });
      }, 500);
    },
    CoinsRender: function CoinsRender(CoinAry) {
      var _this = this;
      wx.createSelectorQuery().selectAll('.coin-cont').boundingClientRect(function (rects) {
        rects.forEach(function (rect) {
          rect.id; // 节点的ID
          rect.dataset; // 节点的dataset
          rect.left; // 节点的左边界坐标
          rect.right; // 节点的右边界坐标
          rect.top; // 节点的上边界坐标
          rect.bottom; // 节点的下边界坐标
          rect.width; // 节点的宽度
          rect.height; // 节点的高度
        });
        _this.getObj = {
          width: rects[0]['width'] * 2,
          height: rects[0]['height'] * 2
        };
      }).exec();
    },
    RandomMoneyMake: function RandomMoneyMake(CoinAry, obj) {
      var _this3 = this;

      CoinAry.forEach(function (v) {
        v.translateX = 0;
        v.translateY = 0;
        v.opacity = 1;
        v.right = Object(__WEBPACK_IMPORTED_MODULE_1__utils_index__["b" /* RandomNum */])(10, (_this3.getObj.width - _this3.coin.width) / 2), v.top = Object(__WEBPACK_IMPORTED_MODULE_1__utils_index__["b" /* RandomNum */])(10, (_this3.getObj.height - _this3.coin.height) / 2);
      });
      this.CoinList = CoinAry;
    }
  },

  mounted: function mounted() {
    var _this4 = this;

    this.CoinsRender();
    setInterval(function () {
      _this4.RandomMoneyMake(_this4.CoinList, _this4.getObj);
    }, 8000);
  }
});

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-center bg-grey"
  }, [_c('div', {
    staticClass: "user-info bg-white"
  }, [_c('div', {
    staticClass: "user-info-avatar"
  }, [_c('open-data', {
    attrs: {
      "type": "userAvatarUrl",
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "user-info-detail"
  }, [_c('open-data', {
    staticClass: "setName",
    attrs: {
      "type": "userNickName",
      "lang": "zh_CN",
      "mpcomid": '1'
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "coin-cont"
  }, [_c('div', {
    staticClass: "coin-bg",
    class: _vm.ShopShakeType ? 'shake' : ''
  }), _vm._v(" "), _vm._l((_vm.CoinList), function(v, index) {
    return _c('div', {
      key: index
    }, [_c('div', {
      staticClass: "coin",
      style: ({
        'right': v.right + 'px',
        'top': v.top + 'px',
        'opacity': v.opacity,
        'transform': 'translate(' + v.translateX + 'px,' + v.translateY + 'px)'
      }),
      attrs: {
        "eventid": '0-' + index
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.CoinClick(v, index)
        }
      }
    }, [_c('div', {
      staticClass: "coinConten"
    }, [_c('image', {
      attrs: {
        "src": v.ImgUrl
      }
    }), _vm._v(" "), _c('button', {
      staticClass: "getFormeId"
    })], 1)])])
  })], 2), _vm._v(" "), _vm._m(0)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "radius shadow-blur"
  }, [_c('image', {
    staticClass: "gif-blue response",
    staticStyle: {
      "height": "100rpx"
    },
    attrs: {
      "src": "https://image.weilanwl.com/gif/wave.gif",
      "mode": "scaleToFill"
    }
  })])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-04c1078a", esExports)
  }
}

/***/ })

},[125]);
//# sourceMappingURL=main.js.map