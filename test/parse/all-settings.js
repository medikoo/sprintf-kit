"use strict";

var test  = require("tape")
  , parse = require("../../parse");

test("parse", function (t) {
	t.test("Should parse text with", function (t) {
		t.deepEqual(
			parse("foo %23$+ 30.30hhhmarko"),
			{
				literals: ["foo ", "marko"],
				placeholders: [
					{
						parameter: 23,
						flags: "+ ",
						width: 30,
						precision: 30,
						length: "hh",
						type: "h",
						content: "%23$+ 30.30hhh"
					}
				],
				isParameterIndexingValid: false
			},
			"Full characteristics placeholder (double chars case)"
		);

		t.deepEqual(
			parse("foo %1$ 3.3hh marko"),
			{
				literals: ["foo ", " marko"],
				placeholders: [
					{
						parameter: 1,
						flags: " ",
						width: 3,
						precision: 3,
						length: "h",
						type: "h",
						content: "%1$ 3.3hh"
					}
				],
				isParameterIndexingValid: true
			},
			"Full characteristics placeholder (single chars case)"
		);
		t.end();
	});
	t.end();
});
