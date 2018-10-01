"use strict";

var test        = require("tape")
  , formatParts = require("../format-parts");

test("getResolver", function (t) {
	t.test("Should resolve", function (t) {
		t.equal(formatParts({ literals: ["foo raz"], substitutions: [], rest: null }), "foo raz");
		t.equal(
			formatParts({ literals: ["foo ", ""], substitutions: ["marko"], rest: null }),
			"foo marko", "Single placeholder"
		);
		t.equal(
			formatParts({
				literals: ["foo ", " ", ""],
				substitutions: ["marko", "12"],
				rest: null
			}),
			"foo marko 12", "Two placeholders"
		);
		t.equal(
			formatParts({ literals: [], substitutions: [], rest: null }), "",
			"Non-string first argument without rest"
		);

		t.equal(
			formatParts({ literals: ["foo ", ""], substitutions: ["marko"], rest: " 12-elo" }),
			"foo marko 12-elo", "with rest handling"
		);
		t.equal(
			formatParts({ literals: [], substitutions: [], rest: "12-13" }), "12-13",
			"Non-string first argument with rest"
		);
		t.end();
	});
	t.end();
});
