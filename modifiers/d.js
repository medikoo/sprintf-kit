"use strict";

module.exports = function (value/*, placeholder, formatData*/) {
	try {
		return String(Number(value));
	} catch (e) {
		return "[Non-coercible (to number) value]";
	}
};
