(function(m, o, r, u, l, u, s) {
    var mixin = function() {
        var mixinup = function(a, b) {
            for (var i in b) {
                if (b.hasOwnProperty(i)) {
                    a[i] = b[i];
                }
            }
            return a;
        };
        return function(a) {
            var i = 1;
            for (;i < arguments.length; i++) {
                if ("object" === typeof arguments[i]) {
                    mixinup(a, arguments[i]);
                }
            }
            return a;
        };
    }();
    var inherit = function(mixin) {
        return function(aClass, classes) {
            if (!(classes instanceof Array)) classes = [ classes ];
            var cl = classes.length;
            var superconstructor = function() {
                var args = Array.prototype.slice.apply(arguments);
                if (arguments.length > 1) console.log("eval widget", args[1].debug);
                for (var i = 0; i < cl; ++i) {
                    if (this.__proto__.constructors.indexOf(classes[i]) >= 0) continue;
                    this.__proto__.constructors.push(classes[i]);
                    classes[i].apply(this, args);
                }
            }, superprototype = superconstructor.prototype = {};
            if (aClass.prototype && aClass.prototype !== null && aClass.prototype.__super__) mixin(superprototype, aClass.prototype.__super__);
            for (var i = 0; i < cl; ++i) {
                if (classes[i].prototype) {
                    if (classes[i].prototype.__super__) superprototype = mixin(superprototype, classes[i].prototype.__super__);
                    superprototype = mixin(superprototype, classes[i].prototype);
                }
            }
            superprototype.constructor = superconstructor;
            var Mixin = function() {
                if (this.constructor && this.constructor.__disableContructor__) {
                    console.log("ESCAPE CONSTRUCTOR");
                    this.constructor.__disableContructor__ = false;
                    return false;
                }
                var args = Array.prototype.slice.apply(arguments);
                if (!(this === window)) {
                    superconstructor.apply(this, args);
                }
                aClass.apply(this, args);
            };
            Mixin.prototype = Object.create(superprototype, {
                constructors: {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: []
                },
                __super__: {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: superprototype
                }
            });
            if (aClass.prototype) mixin(Mixin.prototype, aClass.prototype);
            for (var prop in aClass) {
                if (aClass.hasOwnProperty(prop)) Mixin[prop] = aClass[prop];
            }
            Object.defineProperty(Mixin.prototype, "constructor", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: Mixin
            });
            if (!Mixin.prototype.__proto__) {
                Mixin.prototype.__proto__ = Mixin.prototype;
            }
            return Mixin;
        };
    }(mixin);
    Function.prototype.inherit = function() {
        var classes = Array.prototype.slice.apply(arguments);
        return inherit(this, classes);
    };
    Function.prototype.proto = function(proto) {
        if ("object" !== typeof this.prototype) this.prototype = {
            constructor: this
        };
        mixin(this.prototype, proto);
        return this;
    };
})();