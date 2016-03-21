webpackHotUpdate(0,{

/***/ 160:
/*!*************************************************************!*\
  !*** ./src/client/js/application/components/application.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _header = __webpack_require__(/*! ./header */ 161);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _footer = __webpack_require__(/*! ./footer */ 219);
	
	var _footer2 = _interopRequireDefault(_footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(/*! ../../../assets/sass/application.scss */ 220);
	
	var Application = function (_React$Component) {
	    _inherits(Application, _React$Component);
	
	    function Application(props, context) {
	        _classCallCheck(this, Application);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Application).call(this, props, context));
	
	        _this.state = {};
	        return _this;
	    }
	
	    _createClass(Application, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_header2.default, null),
	                this.props.children,
	                _react2.default.createElement(_footer2.default, null)
	            );
	        }
	    }]);
	
	    return Application;
	}(_react2.default.Component);
	
	exports.default = Application;

/***/ },

/***/ 161:
/*!********************************************************!*\
  !*** ./src/client/js/application/components/header.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 162);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Footer = function (_React$Component) {
	    _inherits(Footer, _React$Component);
	
	    function Footer(props, context) {
	        _classCallCheck(this, Footer);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).call(this, props, context));
	
	        _this.state = {};
	        return _this;
	    }
	
	    _createClass(Footer, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'header',
	                    { className: 'navbar', id: 'navbar', role: 'banner' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'container' },
	                        _react2.default.createElement(
	                            'h1',
	                            null,
	                            'HIKING WORLD - THE BEST HIKING THINGY IN THE WORLD!!!'
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Footer;
	}(_react2.default.Component);
	/**<div className="navbar-collapse collapse">
	 <ul className="menu nav navbar-nav">
	 <Link to="/">menu1</Link>
	 <Link to="/">menu2</Link>
	 <Link to="/">menu3</Link>
	 <Link to="/">menu4</Link>
	 </ul>
	 </div>*/
	
	
	exports.default = Footer;

/***/ }

})
//# sourceMappingURL=0.704afce163d0d7e736c7.hot-update.js.map