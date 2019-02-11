"use strict";

var test      = require("tape")
  , typeChars = require("../../lib/type-chars");

test("typeChars", function (t) {
	t.test("Should reference a-z chars", function (t) {
		t.equal(typeChars.a, true);
		t.end();
	});
	t.test("Should reference A-Z chars", function (t) {
		t.equal(typeChars.A, true);
		t.end();
	});
	t.test("Should not reference digits", function (t) {
		t.equal(typeChars.A, true);
		t.end();
	});
	t.end();
});
