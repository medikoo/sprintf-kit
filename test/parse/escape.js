"use strict";

var test  = require("tape")
  , parse = require("../../parse");

test("parse", function (t) {
	t.test("Should parse text with", function (t) {
		t.deepEqual(
			parse("foo %%"),
			{
				literals: ["foo ", ""],
				placeholders: [{ type: "%", content: "%%" }],
				isParameterIndexingValid: true
			},
			"Escape at the end"
		);

		t.deepEqual(
			parse("%% foo"),
			{
				literals: ["", " foo"],
				placeholders: [{ type: "%", content: "%%" }],
				isParameterIndexingValid: true
			},
			"Escape at the beginning"
		);

		t.deepEqual(
			parse("foo %% bar"),
			{
				literals: ["foo ", " bar"],
				placeholders: [{ type: "%", content: "%%" }],
				isParameterIndexingValid: true
			},
			"Escape in a middle"
		);

		t.deepEqual(
			parse("%%"),
			{
				literals: ["", ""],
				placeholders: [{ type: "%", content: "%%" }],
				isParameterIndexingValid: true
			},
			"Just escape"
		);
		t.end();
	});
	t.end();
});
