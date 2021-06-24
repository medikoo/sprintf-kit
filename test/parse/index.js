"use strict";

var test  = require("tape")
  , parse = require("../../parse");

test("parse", function (t) {
	t.test("Should parse text with", function (t) {
		t.deepEqual(
			parse("foo %s"),
			{
				literals: ["foo ", ""],
				placeholders: [{ type: "s", content: "%s" }],
				isParameterIndexingValid: true
			},
			"Single simple placeholder at the end"
		);

		t.deepEqual(
			parse("%s foo"),
			{
				literals: ["", " foo"],
				placeholders: [{ type: "s", content: "%s" }],
				isParameterIndexingValid: true
			},
			"Single simple placeholder at the beginning"
		);

		t.deepEqual(
			parse("foo %s bar"),
			{
				literals: ["foo ", " bar"],
				placeholders: [{ type: "s", content: "%s" }],
				isParameterIndexingValid: true
			},
			"Single simple placeholder in a middle"
		);

		t.deepEqual(
			parse("foo bar"),
			{ literals: ["foo bar"], placeholders: [], isParameterIndexingValid: true },
			"No placeholder"
		);

		t.deepEqual(
			parse("%s"),
			{
				literals: ["", ""],
				placeholders: [{ type: "s", content: "%s" }],
				isParameterIndexingValid: true
			},
			"Just placeholder"
		);

		t.deepEqual(
			parse("%s foo %d"),
			{
				literals: ["", " foo ", ""],
				placeholders: [
					{ type: "s", content: "%s" }, { type: "d", content: "%d" }
				],
				isParameterIndexingValid: true
			},
			"Multiple simple placeholders at the edge"
		);

		t.deepEqual(
			parse("foo %s bar %d zed"),
			{
				literals: ["foo ", " bar ", " zed"],
				placeholders: [
					{ type: "s", content: "%s" }, { type: "d", content: "%d" }
				],
				isParameterIndexingValid: true
			},
			"Multiple simple placeholders in a middle"
		);

		t.deepEqual(
			parse("foo %_ marko"),
			{ literals: ["foo %_ marko"], placeholders: [], isParameterIndexingValid: true },
			"Invalid placeholder"
		);

		t.end();
	});
	t.end();
});
