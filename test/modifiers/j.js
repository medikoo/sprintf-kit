"use strict";

var test     = require("tape")
  , modifier = require("../../modifiers/j");

test("Should resolve", function (t) {
	t.equal(modifier({ foo: "bar" }), "{\n  \"foo\": \"bar\"\n}", "JSON string for JSON object");
	var obj = { toJSON: function () { throw new Error("foo"); } };
	t.equal(modifier(obj)[0], "<", "meaningful error string for invalid value");
	obj = {};
	obj.obj = obj;
	t.equal(modifier(obj)[0], "<", "meaningful error for circular references");
	t.equal(modifier()[0], "<", "meaningful error for non serializable values");
	t.end();
});
