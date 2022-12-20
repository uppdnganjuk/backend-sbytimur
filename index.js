const express = require("express");
const bodyParser = require("body-parser");
const handler = require("./handler/dbHandler");
const services = require("./handler/services");
const config = require("./config.json");
const cors = require("cors");
const http = require("http");
const app = express();
const api = express();

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

let interval;

io.on("connection", (socket)=>{
  console.log("New client connected");
  if(interval){
    clearInterval(interval)
  }
  interval = setInterval(()=> getApiandEmit(socket),1000);
  socket.on("disconnect",()=>{
    console.log("Client Disconnect");
    clearInterval(interval);
  })
})

let getApiandEmit = (socket)=>{
  const response = new Date();
  socket.emit("FromApi",response);
}

const router = app.use("/api",api);
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
api.use(bodyParser.json())
api.get("/",cors(), handler.getAllDatas);
api.post("/insertData",handler.insertData);
api.get("/number/availablenumber",cors(), handler.getAvailableNum);
api.get("/number/availablenumber/search",cors(), handler.getAvailableNumByDate);
api.get("/number/numberlist/search",cors(), handler.getNumberListByDate);
api.get("/number/numberlist/search/recent/:number",cors(), handler.getRecentNumberList);
api.get("/number/numberlist/search/byentry/:gt/:lt",cors(), handler.getNumberListByDateEntry);
api.get("/number/numberlist",cors(),handler.getNumberList);
api.get("/number/numberlistmasuk",cors(),handler.getNumberListMasuk);
api.get("/number/numberlistmasuk/search",cors(),handler.getNumberListByDateMasuk);
api.get("/number/numberlist/search/bynumber/:gt/:lt", cors(), handler.getNumberListByDateSpec);
api.post("/number/numberlistmasuk",cors(),handler.postNumberListMasuk);
api.post("/number/availablenumber",cors(), handler.postAvailableNum);
api.post("/number/numberlist",cors(), handler.postNumberList);
api.post("/number/numberlistmasuk/id/:id",cors(),handler.deleteNumberListMasuk);
api.post("/number/numberlist/id/:id",cors(), handler.deleteNumberList);
api.post("/number/availablenumber/delete/:id",cors(), handler.deleteNumberAvailable);
api.post("/hp/sendAllPhone",cors(),services.whatsAppPush);
api.get("/hp/getAllPhone",cors(),handler.getAllPhoneByUser);
api.get("/pig/user/:nik",cors(),handler.getUserPIG);
api.get("/pig/user/institution/:institution",cors(),handler.getUserPIGbyInstitute);
api.get("/pig/admin/report",cors(),handler.getAllReport);
api.post("/pig/user/sendreport",cors(),handler.sendReport)
app.listen(config.port, services.checkConnection);


