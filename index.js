const express = require("express");
const bodyParser = require("body-parser");
const handler = require("./handler/dbHandler");
const cors = require("cors");
const app = express();
const api = express();

const router = app.use("/api",api);
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
api.use(bodyParser.json())
api.get("/",handler.getAllDatas);
api.post("/insertData",handler.insertData);
api.get("/number/availablenumber",cors(), handler.getAvailableNum);
api.get("/number/availablenumber/search",cors(), handler.getAvailableNumByDate);
api.get("/number/numberlist/search",cors(), handler.getNumberListByDate);
api.get("/number/numberlist",cors(),handler.getNumberList);
api.post("/number/availablenumber",cors(), handler.postAvailableNum);
api.post("/number/numberlist",cors(), handler.postNumberList);
app.listen(2000);