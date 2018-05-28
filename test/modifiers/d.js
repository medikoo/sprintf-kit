"use strict";

var test     = require("tape")
  , modifier = require("../../modifiers/d");

test("Should resolve", function (t) {
	t.equal(
		modifier({ valueOf: function () { return "32.23"; } }), "32.23",
		"Numeric representation for non-number value"
	);
	t.equal(modifier(32.34), "32.34", "Numeric representation for non-number value");
	t.equal(modifier(Infinity), "Infinity", "Inifity for Infinity");
	t.equal(
		modifier(Object.create(null))[0], "<", "meaningful error string for non-corcible value"
	);
	t.end();
});
