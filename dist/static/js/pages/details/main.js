global.webpackJsonp([1],{

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bg-white padding-lr"
  }, [_c('view', {
    staticClass: "solid-bottom text-xl padding skeletons-rect"
  }, [_c('text', {
    staticClass: "text-black text-bold"
  }, [_vm._v(_vm._s(_vm.textList.title))])]), _vm._v(" "), _c('view', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.textList.content_short),
      expression: "textList.content_short"
    }],
    staticClass: "solid-bottom text-lg padding bg-grey radius skeletons-rect"
  }, [_c('text', [_c('text', {
    staticClass: "text-orange text-bold"
  }, [_vm._v("摘要 ：")]), _vm._v(_vm._s(_vm.textList.content_short))])]), _vm._v(" "), _c('view', {
    staticClass: "solid-bottom text-lg padding skeletons-rect",
    domProps: {
      "innerHTML": _vm._s(_vm.textList.content)
    }
  }), _vm._v(" "), _c('skeletons', {
    attrs: {
      "is_capture_nodes": _vm.is_capture_nodes,
      "is_complete": _vm.is_complete,
      "loading": "music",
      "block_animation": "shine",
      "selector": "skeletons",
      "background": "#fff",
      "mpcomid": '0'
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
     require("vue-hot-reload-api").rerender("data-v-445c520c", esExports)
  }
}

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(73);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    // 注意，页面级可配置属性相当于只是`src/main.js`中配置里的`window`部分
    navigationBarTitleText: '详情',
    usingComponents: {
      skeletons: '/static/components/component/skeletons/index'
    }
  }
});

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_445c520c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(173);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(74)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-445c520c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_445c520c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
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

/***/ 74:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 75:
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

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      textList: {},
      is_capture_nodes: false,
      is_complete: false
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

      wx.cloud.callFunction({
        name: 'reptile',
        data: { type: 'getDetail', id: id, extract: 1 }
      }).then(function (res) {
        _this.is_capture_nodes = true;
        _this.textList = res.result.home.data || '默认';
        _this.is_complete = true;
      }).catch(function (error) {
        _this.is_complete = true;
        console.log(error);
      });
    }
  }
});

/***/ })

},[72]);
//# sourceMappingURL=main.js.map