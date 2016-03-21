webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/*!********************************************!*\
  !*** ./src/client/js/application/index.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 159);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _application = __webpack_require__(/*! ./components/application */ 160);
	
	var _application2 = _interopRequireDefault(_application);
	
	var _frontpage = __webpack_require__(/*! ./components/frontpage */ 163);
	
	var _frontpage2 = _interopRequireDefault(_frontpage);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 164);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 186);
	
	var _configurestore = __webpack_require__(/*! ./store/configurestore.js */ 182);
	
	var _configurestore2 = _interopRequireDefault(_configurestore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var store = (0, _configurestore2.default)();
	
	_reactDom2.default.render(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(
	        _reactRouter.Router,
	        null,
	        _react2.default.createElement(
	            _reactRouter.Route,
	            { path: '/', component: _application2.default },
	            _react2.default.createElement(_reactRouter.IndexRoute, { component: _frontpage2.default })
	        )
	    )
	), document.getElementById('root'));

/***/ }
])
//# sourceMappingURL=0.fd73f55f6bd131af0476.hot-update.js.map