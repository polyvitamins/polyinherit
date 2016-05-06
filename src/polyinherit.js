'use strict';
import mixin from 'mixin';
import inherit from 'inherit';

export {inherit as inherit};

export var polymixin = function() {
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

	mixins.reverse().forEach(function(mixin, i) {
		//__super__[mixin.name!==""?mixin.name:"$"+i] = mixin; // Not supported
		// Mixin with __superprototype__
		if ("object"===typeof mixin.__superprototype__)
		for (var prop in mixin.__superprototype__) {
			if (mixin.__superprototype__.hasOwnProperty(prop)) {
				Object.defineProperty(__prototypes__, prop, Object.getOwnPropertyDescriptor(mixin.__superprototype__, prop));
			}
		}
		// Mixin with prototype
		if ("object"===typeof mixin.prototype)
		for (var prop in mixin.prototype) {
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
}

export function globalize() {
		Function.prototype.inherit = function() {
		    var classes = Array.prototype.slice.apply(arguments);
		    return inherit(this, classes);
		}

		Function.prototype.proto = function(proto) {
			if ("object"!==typeof this.prototype) this.prototype = {
				constructor: this
			};
			mixin(this.prototype, proto);
			return this;
		}

		Function.prototype.construct = function() {
			
			this.__disableContructor__ = true;
			
			var module = new this();
			var args = arguments[0] instanceof Array ? arguments[0] : [];
			
			this.apply(module, args);
			return module;
		}
}
