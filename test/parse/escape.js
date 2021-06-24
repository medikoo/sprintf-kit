"use strict";

var test  = require("tape")
  , parse = require("../../parse");

test("parse", function (t) {
	t.test("Should parse text with", function (t) {
		t.deepEqual(
			parse("foo %%"),
			{ literals: ["foo %"], placeholders: [], isParameterIndexingValid: true },
			"Escape at the end"
		);

		t.deepEqual(
			parse("%% foo"),
			{ literals: ["% foo"], placeholders: [], isParameterIndexingValid: true },
			"Escape at the beginning"
		);

		t.deepEqual(
			parse("foo %% bar"),
			{ literals: ["foo % bar"], placeholders: [], isParameterIndexingValid: true },
			"Escape in a middle"
		);

		t.deepEqual(
			parse("%%%% foo %%%% bar %%%%"),
			{ literals: ["%% foo %% bar %%"], placeholders: [], isParameterIndexingValid: true },
			"Doubled escapes"
		);

		t.deepEqual(
			parse("%%"), { literals: ["%"], placeholders: [], isParameterIndexingValid: true },
			"Just escape"
		);
		t.end();
	});
	t.end();
});
