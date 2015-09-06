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
});