"use strict";

var test     = require("tape")
  , modifier = require("../../modifiers/i");

test("Should resolve", function (t) {
	t.equal(
		modifier({ valueOf: function () { return "32.23"; } }), "32",
		"Integer representation for non-number value"
	);
	t.equal(modifier(32.34), "32", "Integer representation for number value");
	t.equal(modifier("32.14hg"), "32", "Integer representation for string numeric value");
	t.equal(modifier(Infinity), "Infinity", "Infinity for infinity");
	t.equal(
		modifier(Object.create(null))[0], "<", "meaningful error string for non-corcible value"
	);
	t.end();
});
