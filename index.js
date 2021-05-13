var express = require("express");
var path = require("path");
var back = require("./src/back");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

app.use(cors());

app.use(bodyParser.json());

back(app);

var port = (process.env.PORT || 10000);

app.use("/", express.static(path.join(__dirname,"public")));

app.listen(port, () =>{
    console.log(`Server ready listening on port ${port}`);
});
