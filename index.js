"use strict";

var getPartsResolver = require("./get-parts-resolver");

module.exports = function (modifiers) {
	var resolveParts = getPartsResolver(modifiers);

	return function (formatIgnored/*, ...params*/) {
		var data = resolveParts.apply(null, arguments);
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
