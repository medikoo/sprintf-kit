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
		return JSON.stringify(value, null, "  ");
	} catch (e) {
		if (e.message === CIRCULAR_JSON_ERROR_MESSAGE) return "[Circular JSON]";
		return "<Non-serializable (to JSON) value>";
	}
};
