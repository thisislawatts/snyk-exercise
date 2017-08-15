import test from "ava";

const fixtures = {
  "https://registry.npmjs.org/express": "./fixtures/stub.json"
};

let fetcher = function(url, cb) {
  console.log(url);
  cb(null, null, JSON.stringify(require(fixtures[url])));
};

const Inspect = require("../src/inspect");
const inspector = new Inspect(fetcher);

test(async function(t) {
  let res = await inspector.inspect("express", "4.15.4", 1);
  t.is(res.name, "express");
  t.is(res.version, "4.15.4");
  t.truthy(res.dependencies.length);
  t.truthy(res.devDependencies.length);
});
