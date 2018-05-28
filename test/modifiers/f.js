"use strict";

var test     = require("tape")
  , modifier = require("../../modifiers/f");

test("Should resolve", function (t) {
	t.equal(
		modifier({ valueOf: function () { return "32.23"; } }), "32.23",
		"Float representation for non-number value"
	);
	t.equal(modifier(32.34), "32.34", "Float representation for number directly");
	t.equal(modifier("32.14hg"), "32.14", "Float representation for string numeric value");
	t.equal(modifier(Infinity), "Infinity", "Inifity for Infinity");
	t.equal(
		modifier(Object.create(null))[0], "<", "meaningful error string for non-corcible value"
	);
	t.end();
});
