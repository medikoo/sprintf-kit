"use strict";

var getResolver = require("./get-resolver");

module.exports = function (modifiers) {
	var resolve = getResolver(modifiers);

	return function (formatIgnored/*, ...params*/) {
		var data = resolve.apply(null, arguments);
		var literals = data.literals;
		var substitutions = data.substitutions;
		var resolvedString = literals.length
			? literals.reduce(function (resolved, literal, index) {
					return resolved + substitutions[index - 1] + literal;
			  })
			: "";
		if (data.rest) resolvedString += data.rest;
		return resolvedString;
	};
};
