"use strict";

var test  = require("tape")
  , parse = require("../../parse");

test("parse", function (t) {
	t.test("Should parse text with", function (t) {
		t.deepEqual(
			parse("foo %20d"),
			{
				literals: ["foo ", ""],
				placeholders: [{ width: 20, type: "d", content: "%20d" }],
				isParameterIndexingValid: true
			},
			"Width in placeholder"
		);
		t.deepEqual(
			parse("foo %*d"),
			{
				literals: ["foo ", ""],
				placeholders: [{ width: "*", type: "d", content: "%*d" }],
				isParameterIndexingValid: true
			},
			"Dynamic width in placeholder"
		);
		t.deepEqual(
			parse("foo %1$*d"),
			{ literals: ["foo %1$*d"], placeholders: [], isParameterIndexingValid: true },
			"Dynamic width with parameter mix up (invalid)"
		);

		t.deepEqual(
			parse("foo %.20d"),
			{
				literals: ["foo ", ""],
				placeholders: [{ precision: 20, type: "d", content: "%.20d" }],
				isParameterIndexingValid: true
			},
			"Precision in placeholder"
		);
		t.deepEqual(
			parse("foo %.*d"),
			{
				literals: ["foo ", ""],
				placeholders: [{ precision: "*", type: "d", content: "%.*d" }],
				isParameterIndexingValid: true
			},
			"Dynamic precision in placeholder"
		);
		t.deepEqual(
			parse("foo %1$.*d"),
			{ literals: ["foo %1$.*d"], placeholders: [], isParameterIndexingValid: true },
			"Dynamic precision with parameter mix up (invalid)"
		);

		t.deepEqual(
			parse("foo %.xd"),
			{ literals: ["foo %.xd"], placeholders: [], isParameterIndexingValid: true },
			"Invalid precision in placeholder"
		);

		t.deepEqual(
			parse("foo %ld"),
			{
				literals: ["foo ", ""],
				placeholders: [{ length: "l", type: "d", content: "%ld" }],
				isParameterIndexingValid: true
			},
			"Single length in placeholder"
		);
		t.deepEqual(
			parse("foo %ll"),
			{
				literals: ["foo ", ""],
				placeholders: [{ length: "l", type: "l", content: "%ll" }],
				isParameterIndexingValid: true
			},
			"Single length with confusing type in placeholder"
		);
		t.deepEqual(
			parse("foo %lld"),
			{
				literals: ["foo ", ""],
				placeholders: [{ length: "ll", type: "d", content: "%lld" }],
				isParameterIndexingValid: true
			},
			"Double length in placeholder"
		);
		t.end();
	});
	t.end();
});
