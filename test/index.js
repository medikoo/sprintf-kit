"use strict";

var test        = require("tape")
  , modifierD   = require("../modifiers/d")
  , modifierS   = require("../modifiers/s")
  , getResolver = require("../");

test("Should", function (t) {
	t.test("Resolve", function (t) {
		// eslint-disable-next-line id-length
		var resolve = getResolver({ d: modifierD, s: modifierS });
		t.equal(resolve("foo %s", "marko"), "foo marko", "Single placeholder");
		t.equal(resolve("foo %s %d", "marko", 12), "foo marko 12", "Two placeholders");
		t.equal(
			resolve("foo %s %d", "marko", 12, "elo"), "foo marko 12",
			"Two placeholders with arguments overflow and no rest handling defined"
		);
		t.equal(
			resolve("foo %s %d", "marko"), "foo marko %d", "Two placeholders with argument missing"
		);
		t.equal(resolve("foo %2$s %1$d", 12, "bar"), "foo bar 12", "Parameters swap");
		t.equal(resolve("foo %*d", 10, 12), "foo 12", "Dynamic width");
		t.equal(resolve("foo %.*d", 10, 12), "foo 12", "Dynamic precision");
		t.equal(
			resolve("foo %2$s %2$d", 12, "bar"),
			"foo [invalid placeholder parameters] [invalid placeholder parameters]",
			"Invalid parameters setup"
		);
		t.equal(resolve(12, 13), "", "Non-string first argument without rest");

		resolve = getResolver({
			d: modifierD,
			// eslint-disable-next-line id-length
			s: modifierS,
			rest: function (args, data) { return (data ? " " : "") + args.join("-"); }
		});

		t.equal(
			resolve("foo %s", "marko", 12, "elo"), "foo marko 12-elo",
			"Arguments overflow with rest handling"
		);
		t.equal(
			resolve("foo %*s", 10, "marko", 12, "elo"), "foo marko 12-elo",
			"Arguments overflow with rest handling and width shift"
		);
		t.equal(resolve("foo %x", "elo"), "foo %x", "Placeholder content on unknown type");
		t.equal(resolve(12, 13), "12-13", "Non-string first argument with rest");
		t.end();
	});
	t.throws(
		function () { getResolver({ foo: modifierD }); }, TypeError, "Reject invalid modifiers map"
	);

	t.end();
});
