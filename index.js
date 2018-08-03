"use strict";

var aFrom               = require("es5-ext/array/from")
  , identity            = require("es5-ext/function/identity")
  , ensureObject        = require("es5-ext/object/valid-object")
  , objForEach          = require("es5-ext/object/for-each")
  , ensurePlainFunction = require("es5-ext/object/ensure-plain-function")
  , primitiveSet        = require("es5-ext/object/primitive-set")
  , typeChars           = require("./lib/type-chars")
  , parse               = require("./parse");

var slice = Array.prototype.slice;

var customTypes = primitiveSet("literal", "rest");

var validateModifiers = function (modifiers) {
	objForEach(ensureObject(modifiers), function (value, type) {
		if (!hasOwnProperty.call(typeChars, type) && !customTypes[type]) {
			throw new TypeError("Invalid modifier type: " + type);
		}
		ensurePlainFunction(value);
	});
};

var resolveRest = function (modifier, data, args, placeholderArgsLength) {
	if (!modifier || args.length <= placeholderArgsLength) return "";
	return modifier(args.slice(placeholderArgsLength), data);
};

var resolveStringWithPlaceholders = function (modifiers, data, args) {
	var extraPlaceholderArgsLength = 0;
	var isParameterIndexingValid = data.isParameterIndexingValid;
	var resolvedString = data.literals.reduce(function (result, literal, index) {
		if (index === 1 && modifiers.literal) result = modifiers.literal(result, args);
		var placeholder = data.placeholders[index - 1];
		var resolvedPlaceholder;
		if (placeholder.width === "*") ++extraPlaceholderArgsLength;
		if (placeholder.precision === "*") ++extraPlaceholderArgsLength;
		if (!isParameterIndexingValid) {
			resolvedPlaceholder = "[invalid placeholder parameters]";
		} else if (modifiers[placeholder.type]) {
			if (placeholder.parameter) index = placeholder.parameter;
			if (index > args.length) {
				resolvedPlaceholder = placeholder.content;
			} else {
				index += extraPlaceholderArgsLength - 1;
				var arg = args[index];
				resolvedPlaceholder = modifiers[placeholder.type](arg, placeholder, index, args);
			}
		} else {
			resolvedPlaceholder = placeholder.content;
		}
		return result + resolvedPlaceholder + (modifiers.literal || identity)(literal, args);
	});
	return (
		resolvedString +
		resolveRest(
			modifiers.rest, data, args, data.placeholders.length + extraPlaceholderArgsLength
		)
	);
};

var resolveStringWithoutPlaceholders = function (modifiers, data, args) {
	var resolvedString = data.literals[0];
	if (modifiers.literal) resolvedString = modifiers.literal(resolvedString);
	return resolvedString + resolveRest(modifiers.rest, data, args, data.placeholders.length);
};

module.exports = function (modifiers) {
	validateModifiers(modifiers);

	return function (format/*, ...params*/) {
		if (typeof format !== "string") {
			return modifiers.rest ? modifiers.rest(aFrom(arguments)) : "";
		}
		var data = parse(format);
		var args = slice.call(arguments, 1);

		if (data.literals.length > 1) return resolveStringWithPlaceholders(modifiers, data, args);
		return resolveStringWithoutPlaceholders(modifiers, data, args);
	};
};
