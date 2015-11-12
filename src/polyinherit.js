define([
	'polyvitamins~inherit@master',
	'polyvitamins~mixin@master'
],
	function(inherit, mixin) {
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

		return inherit;
});