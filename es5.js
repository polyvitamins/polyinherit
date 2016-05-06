'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.polymixin = exports.inherit = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.globalize = globalize;

var _mixin = require('mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _inherit = require('inherit');

var _inherit2 = _interopRequireDefault(_inherit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.inherit = _inherit2.default;
var polymixin = exports.polymixin = function polymixin() {
	var mixins = Array.prototype.slice.apply(arguments),
	    __super__ = {},
	    Mixture = function Mixture() {
		Object.defineProperty(this, '__super__', {
			configurable: false,
			writable: false,
			enumerable: false,
			value: __super__
		});
	},
	    __prototypes__ = {};

	mixins.reverse().forEach(function (mixin, i) {
		//__super__[mixin.name!==""?mixin.name:"$"+i] = mixin; // Not supported
		// Mixin with __superprototype__
		if ("object" === _typeof(mixin.__superprototype__)) for (var prop in mixin.__superprototype__) {
			if (mixin.__superprototype__.hasOwnProperty(prop)) {
				Object.defineProperty(__prototypes__, prop, Object.getOwnPropertyDescriptor(mixin.__superprototype__, prop));
			}
		}
		// Mixin with prototype
		if ("object" === _typeof(mixin.prototype)) for (var prop in mixin.prototype) {
			if (mixin.prototype.hasOwnProperty(prop)) {
				Object.defineProperty(__prototypes__, prop, Object.getOwnPropertyDescriptor(mixin.prototype, prop));
			}
		}
	});

	Mixture.prototype = Object.create(__prototypes__, {
		__super__: {
			value: __super__
		},
		__superprototype__: __prototypes__
	});

	return Mixture;
};

function globalize() {
	Function.prototype.inherit = function () {
		var classes = Array.prototype.slice.apply(arguments);
		return (0, _inherit2.default)(this, classes);
	};

	Function.prototype.proto = function (proto) {
		if ("object" !== _typeof(this.prototype)) this.prototype = {
			constructor: this
		};
		(0, _mixin2.default)(this.prototype, proto);
		return this;
	};

	Function.prototype.construct = function () {

		this.__disableContructor__ = true;

		var module = new this();
		var args = arguments[0] instanceof Array ? arguments[0] : [];

		this.apply(module, args);
		return module;
	};
}
