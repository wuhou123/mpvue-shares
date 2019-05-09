global.webpackJsonp([6],{

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(83);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    navigationBarTitleText: '详情'
  }
});

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_445c520c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(86);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(84)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_445c520c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\details\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-445c520c", Component.options)
  } else {
    hotAPI.reload("data-v-445c520c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 84:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
      textList: {},
      is_capture_nodes: false,
      is_complete: false,
      CustomBar: 0,
      loadProgress: 0
    };
  },
  onLoad: function onLoad(options) {
    var id = options.id;
    this.textList = {};
    this.getDetail(id);
  },

  methods: {
    getDetail: function getDetail(id) {
      var _this = this;

      this.LoadProgress();
      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getDetail', id: id, extract: 1 }
      }).then(function (res) {
        _this.textList = res.result.home.data || '默认';
        _this.textList.content = _this.textList.content.replace(/\<img/gi, '<img style="width:100vw !important"');
        _this.textList.content = _this.textList.content.replace(/\<h2/gi, '<h2 style="font-size:18px"');
        _this.loadProgress = 100;
      }).catch(function (error) {
        console.log(error);
      });
    },
    LoadProgress: function LoadProgress(e) {
      var _this2 = this;

      this.loadProgress = this.loadProgress + 3;
      var timer = void 0;
      if (this.loadProgress < 100) {
        timer = setTimeout(function () {
          _this2.LoadProgress();
        }, 100);
      } else {
        clearTimeout(timer);
        this.loadProgress = 0;
      }
    }
  }
});

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bg-white padding-lr"
  }, [_c('view', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.textList.title),
      expression: "textList.title"
    }],
    staticClass: "solid-bottom text-xl padding"
  }, [_c('text', {
    staticClass: "text-black text-bold"
  }, [_vm._v(_vm._s(_vm.textList.title))])]), _vm._v(" "), _c('view', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.textList.content_short),
      expression: "textList.content_short"
    }],
    staticClass: "solid-bottom text-lg padding bg-grey radius"
  }, [_c('text', [_c('text', {
    staticClass: "text-orange text-bold"
  }, [_vm._v("摘要 ：")]), _vm._v(_vm._s(_vm.textList.content_short))])]), _vm._v(" "), _c('view', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.textList.content),
      expression: "textList.content"
    }],
    staticClass: "solid-bottom text-lg padding css-color-red",
    domProps: {
      "innerHTML": _vm._s(_vm.textList.content)
    }
  }), _vm._v(" "), _c('view', {
    staticClass: "load-progress",
    class: _vm.loadProgress != 0 ? 'show' : 'hide',
    style: ([{
      top: _vm.CustomBar + 'px'
    }])
  }, [_c('view', {
    staticClass: "load-progress-bar bg-green",
    style: ([{
      transform: 'translate3d(-' + (100 - _vm.loadProgress) + '%, 0px, 0px)'
    }])
  }), _vm._v(" "), _c('view', {
    staticClass: "load-progress-spinner text-green"
  })])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-445c520c", esExports)
  }
}

/***/ })

},[82]);
//# sourceMappingURL=main.js.map