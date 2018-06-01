"use strict";

var aFrom               = require("es5-ext/array/from")
  , ensureObject        = require("es5-ext/object/valid-object")
  , objForEach          = require("es5-ext/object/for-each")
  , ensurePlainFunction = require("es5-ext/object/ensure-plain-function")
  , typeChars           = require("./lib/type-chars")
  , parse               = require("./parse");

var slice = Array.prototype.slice;

module.exports = function (modifiers) {
	objForEach(ensureObject(modifiers), function (value, type) {
		if (!hasOwnProperty.call(typeChars, type) && type !== "rest") {
			throw new TypeError("Invalid modifier type: " + type);
		}
		ensurePlainFunction(value);
	});

	return function (format/*, ...params*/) {
		if (typeof format !== "string") {
			return modifiers.rest ? modifiers.rest(aFrom(arguments)) : "";
		}
		var data = parse(format);
		var placeholders = data.placeholders;
		var isParameterIndexingValid = data.isParameterIndexingValid;

		var args = slice.call(arguments, 1);
		var skippedArgsLength = 0;
		var resolvedString = data.literals.reduce(function (result, literal, index) {
			var placeholder = placeholders[index - 1];
			var resolvedPlaceholder;
			if (placeholder.width === "*") ++skippedArgsLength;
			if (placeholder.precision === "*") ++skippedArgsLength;
			if (!isParameterIndexingValid) {
				resolvedPlaceholder = "[invalid placeholder parameters]";
			} else if (modifiers[placeholder.type]) {
				if (placeholder.parameter) index = placeholder.parameter;
				if (index > args.length) {
					resolvedPlaceholder = placeholder.content;
				} else {
					index += skippedArgsLength - 1;
					var arg = args[index];
					resolvedPlaceholder = modifiers[placeholder.type](
						arg, placeholder, index, args
					);
				}
			} else {
				resolvedPlaceholder = placeholder.content;
			}
			return result + resolvedPlaceholder + literal;
		});
		if (!modifiers.rest || args.length <= placeholders.length + skippedArgsLength) {
			return resolvedString;
		}
		return (
			resolvedString +
			modifiers.rest(args.slice(placeholders.length + skippedArgsLength), data)
		);
	};
};
