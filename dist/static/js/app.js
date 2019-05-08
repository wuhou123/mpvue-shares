global.webpackJsonp([1],{

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_index__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__static_css_icon_css__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__static_css_icon_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__static_css_icon_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_css_colorui_css__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_css_colorui_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__static_css_colorui_css__);






__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$store = __WEBPACK_IMPORTED_MODULE_2__store_index__["a" /* default */];

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  // 这个字段走 app.json
  config: {
    pages: ['^pages/home/main', 'pages/details/main', 'pages/market/main', 'pages/news/main'],
    window: {
      navigationBarBackgroundColor: '#F73240',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '',
      backgroundColor: '#F7F8F9',
      backgroundTextStyle: 'dark',
      enablePullDownRefresh: false
    },
    cloud: true,
    tabBar: {
      color: '#666666',
      selectedColor: '#D62B2B',
      borderStyle: 'white',
      backgroundColor: '#fff',
      list: [{
        text: '直播',
        pagePath: 'pages/home/main',
        iconPath: 'static/icon/home.png',
        selectedIconPath: 'static/icon/home_focus.png'
      }, {
        text: '行情',
        pagePath: 'pages/market/main',
        iconPath: 'static/icon/invest.png',
        selectedIconPath: 'static/icon/invest_focus.png'
      }, {
        text: '我的',
        pagePath: 'pages/my/main',
        iconPath: 'static/icon/my.png',
        selectedIconPath: 'static/icon/my_focus.png'
      }]
    }
  }
});

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(55);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(53)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32fff9c1", Component.options)
  } else {
    hotAPI.reload("data-v-32fff9c1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {
    // 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    console.log('app created and cache logs by setStorageSync');
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true
      });
    }
  }
});

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_persistedstate__ = __webpack_require__(64);






__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
    state: __WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_3__mutations__["a" /* default */],
    plugins: [Object(__WEBPACK_IMPORTED_MODULE_4_vuex_persistedstate__["a" /* default */])({
        storage: {
            getItem: function getItem(key) {
                return wx.getStorageSync(key);
            },
            setItem: function setItem(key, value) {
                return wx.setStorageSync(key, value);
            },
            removeItem: function removeItem(key) {}
        }
    })]
}));

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var state = {
    openId: '',
    code: '',
    userInfo: {},
    loginMsg: {}
};
/* harmony default export */ __webpack_exports__["a"] = (state);

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutation_types__ = __webpack_require__(30);


var _matations;


var matations = (_matations = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_matations, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["c" /* SET_OPEN_ID */], function (state, v) {
    state.openId = v;
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_matations, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["a" /* SET_CODE */], function (state, v) {
    state.code = v;
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_matations, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["d" /* SET_USERINFO */], function (state, v) {
    state.userInfo = v;
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_matations, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["b" /* SET_LOGIN */], function (state, v) {
    state.loginMsg = v;
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_matations, 'showToast', function showToast(state, v) {
    wx.showToast({
        title: v.text,
        icon: v.icon,
        duration: 1000
    });
}), _matations);

/* harmony default export */ __webpack_exports__["a"] = (matations);

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[50]);
//# sourceMappingURL=app.js.map