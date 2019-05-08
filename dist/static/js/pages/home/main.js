global.webpackJsonp([5],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container skeletons"
  }, [_c('swiper', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.is_complete),
      expression: "is_complete"
    }],
    staticClass: "card-swiper square-dot skeletons-rect",
    attrs: {
      "indicator-dots": "true",
      "circular": "true",
      "autoplay": "true",
      "interval": "5000",
      "duration": "500",
      "indicator-color": "#8799a3",
      "indicator-active-color": "#0081ff",
      "eventid": '0'
    },
    on: {
      "change": _vm.cardSwiper
    }
  }, _vm._l((_vm.imgList), function(item, index) {
    return _c('swiper-item', {
      key: index,
      class: _vm.cardCur == index ? 'cur' : '',
      attrs: {
        "mpcomid": '0-' + index
      }
    }, [_c('img', {
      staticClass: "bg-img shadow-blur",
      attrs: {
        "src": item,
        "alt": ""
      }
    })])
  })), _vm._v(" "), _c('scroll-view', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.is_complete),
      expression: "is_complete"
    }],
    staticClass: "bg-white nav css-sticky",
    attrs: {
      "scroll-x": ""
    }
  }, [_c('div', {
    staticClass: "flex text-center skeletons-rect"
  }, _vm._l((_vm.tabList), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "cu-item flex-sub",
      class: index == _vm.TabCur ? 'text-orange cur' : '',
      attrs: {
        "data-id": index,
        "eventid": '1-' + index
      },
      on: {
        "tap": _vm.tabSelect
      }
    }, [_vm._v("\n        " + _vm._s(item) + "\n      ")])
  }))]), _vm._v(" "), _c('section', _vm._l((_vm.newsList), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "cu-card article no-card border-top",
      attrs: {
        "eventid": '2-' + index
      },
      on: {
        "click": function($event) {
          _vm.goDetail(item)
        }
      }
    }, [_c('div', {
      staticClass: "cu-item shadow"
    }, [_c('div', {
      staticClass: "title"
    }, [_c('div', {
      staticClass: "text-cut"
    }, [_vm._v(_vm._s(item.resource.title))])]), _vm._v(" "), _c('div', {
      staticClass: "content"
    }, [_c('image', {
      attrs: {
        "src": item.resource.image_uri,
        "mode": "aspectFill"
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "desc"
    }, [_c('div', {
      staticClass: "text-content"
    }, [_vm._v(_vm._s(item.resource.content_short))]), _vm._v(" "), _c('div')])])])])
  })), _vm._v(" "), _c('skeletons', {
    attrs: {
      "is_capture_nodes": _vm.is_capture_nodes,
      "is_complete": _vm.is_complete,
      "loading": "music",
      "block_animation": "shine",
      "selector": "skeletons",
      "background": "#fff",
      "mpcomid": '1'
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-51a5663d", esExports)
  }
}

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(75);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '股市日历',
    usingComponents: {
      skeletons: '/static/components/component/skeletons/index'
    }
  }
});

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_51a5663d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(113);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(76)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-51a5663d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_51a5663d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\home\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51a5663d", Component.options)
  } else {
    hotAPI.reload("data-v-51a5663d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 76:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_allApi__ = __webpack_require__(26);


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
      is_capture_nodes: false,
      is_complete: false,
      listData: [],
      cardCur: 0,
      imgList: [],
      initTime: '',
      tabList: ['推荐', '精选', '国内', '日历', '股市直播'],
      TabCur: 0,
      scrollLeft: 0,
      newsList: []
    };
  },


  methods: {
    getBanner: function getBanner() {
      var _this = this;

      var db = wx.cloud.database();
      var banner = db.collection('banner');
      banner.get().then(function (res) {
        _this.imgList = res.data[0].list || [];
      });
    },
    cardSwiper: function cardSwiper(e) {
      this.cardCur = e.mp.detail.current;
    },
    tabSelect: function tabSelect(e) {
      if (e.currentTarget.dataset.id != 0) {
        var url = "../news/main?tabCur=" + e.currentTarget.dataset.id;
        wx.navigateTo({ url: url });
        return;
      }
      this.TabCur = e.currentTarget.dataset.id;
    },
    getNews: function getNews() {
      var _this2 = this;

      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getNews', limit: 10, cursor: '', channel: 'wscn-free', accept: 'article,newsroom,morning-report,newsrooms,live,calendar,audition,wits-home-users,hot-themes,vote-interactive,discuss-interactive,ad.internal_banner.inhouse,ad.internal_inline.inhouse,ad.inline.inhouse,ad.video.inhouse,ad.banner.inhouse,ad.inline.plista,ad.banner.plista,ad.topic.inhouse,ad.inline.tanx' }
      }).then(function (res) {
        _this2.is_capture_nodes = true;
        var data = res.result.home.data.items || [];
        _this2.newsList = data;
        _this2.is_complete = true;
      }).catch(function (error) {
        _this2.is_complete = true;
        console.log(error);
      });
    },
    goDetail: function goDetail(item) {
      var url = "../details/main?id=" + item.resource.id;
      wx.navigateTo({ url: url });
    }
  },
  onLoad: function onLoad() {
    this.getBanner();
    this.getNews();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    var _this3 = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this3);
    }))();
  },


  // 上拉加载，拉到底部触发
  onReachBottom: function onReachBottom() {}
});

/***/ })

},[74]);
//# sourceMappingURL=main.js.map