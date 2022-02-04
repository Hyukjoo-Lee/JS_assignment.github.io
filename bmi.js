// Import modules
const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Import npm ejs(embedded javascript engine)
// which allows you to create html markup
app.engine("html", require("ejs").renderFile);
// Syntax : views, __dirname + "/" + <folderName>
app.set("views", __dirname + "/" + "webpage");

// Render basic html file
app.get("/", function (req, res) {
  res.render("bmi.html");
});

// Get request and respond rending a new page with html values
app.post("/", function (req, res) {
  let age = req.body.age;
  let weight = req.body.weight;
  let height = req.body.height;

  // TO TEST
  // console.log(age + " " + weight + " " + height);

  // Calculate BMI
  let bmi = (weight / [height * height]) * 10000;

  // One decimal point
  let result = bmi.toFixed(1);

  // Render new page with html markups
  res.render("./result.html", {
    age: age,
    weight: weight,
    height: height,
    result: result,
  });
});

app.listen(port, function () {
  console.log("Listening port " + port);
});
