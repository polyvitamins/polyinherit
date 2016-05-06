'use strict';
var polymixin = require('./src/polyinherit').polymixin;

class A {
	constructor(message) {
		console.log('Instance of A got', message);
	}
}

class B {
	constructor(message) {
		console.log('Instance of B got', message);
	}
}

class C extends polymixin(A, B) {
	constructor() {
		super();
		this.__super__.A('Message to A');
		this.__super__.B('Message to B');
	}
}

var c = new C();