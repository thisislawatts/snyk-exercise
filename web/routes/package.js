const express = require("express");
const request = require("request");

var router = express.Router();
const API_URI = "http://localhost:3000/";

/* GET home page. */
router.get("/", function(req, res) {
  res.redirect("/");
});

router.get("/:package/:version?", function(req, res) {
  console.log(API_URI + `package/` + req.params.package);

  var url = API_URI + `package/` + req.params.package;

  if (req.params.version) {
    url += "/" + req.params.version;
  }

  request(url, (err, response, body) => {
    let package = JSON.parse(body);
    res.render("package", {
      title: package.name,
      results: package,
      jsonObject: body
    });
  });
});

module.exports = router;
