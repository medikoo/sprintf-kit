"use strict";

var test     = require("tape")
  , modifier = require("../../modifiers/s");

test("Should resolve", function (t) {
	t.equal(
		modifier({ toString: function () { return "marko"; } }), "marko",
		"String representation for non-string value"
	);
	t.equal(modifier("barko"), "barko", "String representation for string");
	t.equal(
		modifier(Object.create(null))[0], "[", "meaningful error string for non-corcible value"
	);
	t.end();
});
