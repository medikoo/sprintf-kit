"use strict";

// eslint-disable-next-line consistent-return
var CIRCULAR_JSON_ERROR_MESSAGE = (function () {
	try {
		var a = {};
		a.a = a;
		JSON.stringify(a);
	} catch (err) {
		return err.message;
	}
}());

module.exports = function (value/*, placeholder, argIndex, args*/) {
	try {
		return JSON.stringify(value, null, 2);
	} catch (e) {
		if (e.message === CIRCULAR_JSON_ERROR_MESSAGE) {
			return "<Circular (non-JSON serializable) value>";
		}
		return "<Non-serializable (to JSON) value>";
	}
};
