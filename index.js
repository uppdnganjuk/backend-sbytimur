const express = require("express");
const bodyParser = require("body-parser");
const handler = require("./handler/dbHandler");
const Sinoutsu = require("./handler/dbSinoutsu");
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
api.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next()
})
api.use(bodyParser.json())

api.get("/",cors(), handler.getAllDatas);
api.post("/insertData",handler.insertData);
api.post("/whatsapush/sentrecap",handler.sentWAstatus)
api.get("/whatsapush/laporan",handler.sentWAreport)

api.get("/number/availablenumber",cors(), Sinoutsu.getAvailableNum);
api.get("/number/availablenumber/search",cors(), Sinoutsu.getAvailableNumByDate);
api.get("/number/numberlist/search",cors(), Sinoutsu.getNumberListByDate);
api.get("/number/numberlist/search/recent/:number",cors(), Sinoutsu.getRecentNumberList);
api.put("/number/numberlist/update",cors(), Sinoutsu.updateNumberList)
api.get("/number/numberlist/search/byentry/:gt/:lt",cors(), Sinoutsu.getNumberListByDateEntry);
api.get("/number/numberlist",cors(),Sinoutsu.getNumberList);
api.get("/number/numberlistmasuk",cors(),Sinoutsu.getNumberListMasuk);
api.get("/number/numberlistmasuk/search",cors(),Sinoutsu.getNumberListByDateMasuk);
api.get("/number/numberlist/search/bynumber/:gt/:lt", cors(), Sinoutsu.getNumberListByDateSpec);
api.post("/number/numberlistmasuk",cors(),Sinoutsu.postNumberListMasuk);
api.post("/number/availablenumber",cors(), Sinoutsu.postAvailableNum);
api.post("/number/numberlist",cors(), Sinoutsu.postNumberList);
api.post("/number/numberlistmasuk/id/:id",cors(),Sinoutsu.deleteNumberListMasuk);
api.post("/number/numberlist/id/:id",cors(), Sinoutsu.deleteNumberList);
api.post("/number/availablenumber/delete/:id",cors(), Sinoutsu.deleteNumberAvailable);

api.post("/hp/sendAllPhone",cors(),services.whatsAppPush);
api.get("/hp/getAllPhone",cors(),handler.getAllPhoneByUser);
api.get("/pig/user/:nik",cors(),handler.getUserPIG);
api.get("/pig/user/institution/:institution",cors(),handler.getUserPIGbyInstitute);
api.get("/pig/admin/report",cors(),handler.getAllReport);
api.post("/pig/user/sendreport",cors(),handler.sendReport)
app.listen(config.port, services.checkConnection);


