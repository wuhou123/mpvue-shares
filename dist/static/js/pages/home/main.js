global.webpackJsonp([5],{

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(175);



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

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_51a5663d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(185);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(176)
}
var normalizeComponent = __webpack_require__(0)
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

/***/ 176:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_allApi__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_mutation_types__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_index__ = __webpack_require__(24);



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
      tabList: ['推荐', '精选', '日历'],
      TabCur: 0,
      scrollLeft: 0,
      newsList: []
    };
  },


  methods: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_5_vuex__["b" /* mapMutations */])({
    setLogin: "SET_LOGIN",
    setCode: "SET_CODE",
    setUserInfo: "SET_USERINFO"
  }), {
    getBanner: function getBanner() {
      var _this = this;

      var db = wx.cloud.database();
      var banner = db.collection('banner');
      banner.get().then(function (res) {
        console.log(res.data[0].list);
        _this.imgList = res.data[0].list || [];
      });
    },
    getData: function getData() {
      var _this2 = this;

      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getCalendar' }
      }).then(function (res) {
        _this2.is_capture_nodes = true;
        var list = res.result.home;
        if (list && list.includes('callback_dt')) list = JSON.parse(list.replace('callback_dt(', '').replace(');', ''));
        console.log('getData', list);
        _this2.listData = _this2.fileterData(list) || [];
        _this2.is_complete = true;
        //无数据时
        console.log('this.listData', _this2.listData.length);
        _this2.initTime = Object(__WEBPACK_IMPORTED_MODULE_6__utils_index__["b" /* formatTime */])(new Date());
      }).catch(function (error) {
        _this2.is_complete = true;
        console.log(error);
      });
    },
    fileterData: function fileterData(tmpJSON) {
      var result = [];
      if (tmpJSON.stat != "ok") return result;
      for (var i = 0; i < tmpJSON.data.length; i++) {
        var calendarInfo = { "date": "", "week": "", "events": [] };
        calendarInfo.date = tmpJSON.data[i].date;
        calendarInfo.week = tmpJSON.data[i].week;

        for (var j = 0; j < tmpJSON.data[i].events.length; j++) {
          var eventInfo = { "event": "", "concepts": "", "stocks": "", code: '' };

          eventInfo.event = tmpJSON.data[i].events[j][0].length > 19 ? tmpJSON.data[i].events[j][0].substr(0, 18) + '...' : tmpJSON.data[i].events[j][0];
          for (var k = 0; k < tmpJSON.data[i].concept[j].length; k++) {
            eventInfo.concepts += tmpJSON.data[i].concept[j][k].name + " ";eventInfo.code += tmpJSON.data[i].concept[j][k].code + " ";
          }
          for (var _k = 0; _k < tmpJSON.data[i].field[j].length; _k++) {
            eventInfo.concepts += tmpJSON.data[i].field[j][_k].name + " ";
          } // concept和field合一
          for (var _k2 = 0; _k2 < tmpJSON.data[i].stocks[j].length; _k2++) {
            eventInfo.stocks += tmpJSON.data[i].stocks[j][_k2].name + " ";
          }
          calendarInfo.events.push(eventInfo);
        }
        result.push(calendarInfo);
      }
      console.log('filter', result);
      return result;
    },
    cardSwiper: function cardSwiper(e) {
      this.cardCur = e.mp.detail.current;
    },
    tabSelect: function tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
      if (this.TabCur == 2) this.getData();else this.getNews();
    },
    getNews: function getNews() {
      var _this3 = this;

      if (this.newsList[this.TabCur]) return;
      this.is_capture_nodes = false;
      this.is_complete = false;
      var types = ['wscn-free', 'most-read'];
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getNews', limit: 20, cursor: '', channel: types[this.TabCur], accept: 'article,newsroom,morning-report,newsrooms,live,calendar,audition,wits-home-users,hot-themes,vote-interactive,discuss-interactive,ad.internal_banner.inhouse,ad.internal_inline.inhouse,ad.inline.inhouse,ad.video.inhouse,ad.banner.inhouse,ad.inline.plista,ad.banner.plista,ad.topic.inhouse,ad.inline.tanx' }
      }).then(function (res) {
        _this3.is_capture_nodes = true;
        var data = res.result.home.data.items || [];
        // data.forEach(v => {
        //   let date = parseInt(v.resource.display_time)
        //   v = formatTime(new Date(date))        })
        _this3.newsList[_this3.TabCur] = data;
        _this3.is_complete = true;
        console.log('ressss', res);
      }).catch(function (error) {
        _this3.is_complete = true;
        console.log(error);
      });
    },
    goDetail: function goDetail(item) {
      console.log(item.resource.id);
      var url = "../details/main?id=" + item.resource.id;
      wx.navigateTo({ url: url });
    }
  }),
  onLoad: function onLoad() {
    this.getBanner();
    this.getNews();
  },
  onShow: function onShow() {},
  onPullDownRefresh: function onPullDownRefresh() {
    var _this4 = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this4);
    }))();
  },


  // 上拉加载，拉到底部触发
  onReachBottom: function onReachBottom() {}
});

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container skeletons"
  }, [_c('swiper', {
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
    staticClass: "bg-white nav css-sticky",
    attrs: {
      "scroll-x": ""
    }
  }, [_c('view', {
    staticClass: "flex text-center skeletons-rect"
  }, _vm._l((_vm.tabList), function(item, index) {
    return _c('view', {
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
  }))]), _vm._v(" "), (_vm.TabCur === 0 || _vm.TabCur === 1) ? _c('section', _vm._l((_vm.newsList[_vm.TabCur]), function(item, index) {
    return _c('view', {
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
    }, [_c('view', {
      staticClass: "cu-item shadow"
    }, [_c('view', {
      staticClass: "title"
    }, [_c('view', {
      staticClass: "text-cut"
    }, [_vm._v(_vm._s(item.resource.title))])]), _vm._v(" "), _c('view', {
      staticClass: "content"
    }, [_c('image', {
      attrs: {
        "src": item.resource.image_uri,
        "mode": "aspectFill"
      }
    }), _vm._v(" "), _c('view', {
      staticClass: "desc"
    }, [_c('view', {
      staticClass: "text-content"
    }, [_vm._v(_vm._s(item.resource.content_short))]), _vm._v(" "), _c('view')])])])])
  })) : _vm._e(), _vm._v(" "), (_vm.TabCur === 2) ? _c('section', [_vm._l((_vm.listData), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "cu-timeline"
    }, [_c('div', {
      staticClass: "cu-time skeletons-rect"
    }, [_vm._v(_vm._s(item.date) + " " + _vm._s(item.week))]), _vm._v(" "), _vm._l((item.events), function(sign, sindex) {
      return _c('div', {
        key: sindex,
        staticClass: "cu-item text-blue icon-noticefill skeletons-rect"
      }, [_c('div', {
        staticClass: "content"
      }, [_c('div', {
        staticClass: "cu-capsule radius"
      }, [_c('div', {
        staticClass: "cu-tag bg-cyan"
      }, [_vm._v("事件")]), _vm._v(" "), _c('div', {
        staticClass: "cu-tag line-cyan"
      }, [_vm._v(_vm._s(sign.event))])]), _vm._v(" "), _c('div', {
        staticClass: "margin-top"
      }, [_c('div', {
        staticClass: "cu-tag bg-red"
      }, [_vm._v("影响板块")]), _vm._v(" "), _c('div', {
        staticClass: "cu-tag line-red"
      }, [_vm._v(_vm._s(sign.concepts || '影响股较多'))])])])])
    })], 2)
  }), _vm._v(" "), (_vm.listData && _vm.listData.length === 0) ? _c('section', {
    staticClass: "noData"
  }, [_c('div', {
    staticClass: "cu-timeline"
  }, [_c('div', {
    staticClass: "cu-time skeletons-rect"
  }, [_vm._v(_vm._s(_vm.initTime))]), _vm._v(" "), _c('div', {
    staticClass: "cu-item text-red icon-attentionforbidfill skeletons-rect"
  }, [_c('div', {
    staticClass: "content bg-red shadow-blur"
  }, [_vm._v("\n            当前正在生成数据中...\n          ")])])])]) : _vm._e()], 2) : _vm._e(), _vm._v(" "), _c('skeletons', {
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

/***/ })

},[174]);
//# sourceMappingURL=main.js.map