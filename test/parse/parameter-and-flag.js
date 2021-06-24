"use strict";

var test  = require("tape")
  , parse = require("../../parse");

test("parse", function (t) {
	t.test("Should parse text with parameter", function (t) {
		t.deepEqual(
			parse("foo %1$d"),
			{
				literals: ["foo ", ""],
				placeholders: [{ parameter: 1, type: "d", content: "%1$d" }],
				isParameterIndexingValid: true
			},
			"Parameter in placeholder"
		);

		t.deepEqual(
			parse("foo %1$d %s"),
			{
				literals: ["foo ", " ", ""],
				placeholders: [
					{ parameter: 1, type: "d", content: "%1$d" }, { type: "s", content: "%s" }
				],
				isParameterIndexingValid: false
			},
			"Inconsistent parameters in placeholders"
		);

		t.deepEqual(
			parse("foo %+d"),
			{
				literals: ["foo ", ""],
				placeholders: [{ flags: "+", type: "d", content: "%+d" }],
				isParameterIndexingValid: true
			},
			"Single flag in placeholder"
		);

		t.deepEqual(
			parse("foo %0d"),
			{
				literals: ["foo ", ""],
				placeholders: [{ flags: "0", type: "d", content: "%0d" }],
				isParameterIndexingValid: true
			},
			"Single 0 flag in placeholder"
		);

		t.deepEqual(
			parse("foo %0+d"),
			{
				literals: ["foo ", ""],
				placeholders: [{ flags: "0+", type: "d", content: "%0+d" }],
				isParameterIndexingValid: true
			},
			"Multiple flags in placeholder"
		);
		t.end();
	});
	t.end();
});
