const express = require("express");
const request = require("request");

var router = express.Router();
const API_URI = "http://localhost:3000/";

/* GET home page. */
router.get("/", function(req, res) {
  let inspectors = "🕵️‍♀️ 🕵🏻‍♀️ 🕵🏼‍♀️ 🕵🏽‍♀️ 🕵🏾‍♀️ 🕵🏿‍♀️ 🕵🏿 🕵🏾 🕵🏽 🕵🏼 🕵🏻 🕵️".split(
    " "
  );

  res.render("index", {
    title: "npm Inspector",
    inspector: inspectors[Math.floor(Math.random() * inspectors.length)]
  });
});

router.post("/", function(req, res) {
  if (!req.body.package) {
    res.redirect("/");
  }

  res.redirect(`/package/` + req.body.package);
});

module.exports = router;
