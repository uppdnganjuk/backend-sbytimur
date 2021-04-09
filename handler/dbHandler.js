const connectionHandler = require("../database/db");
let connection, database, collection, datas;
module.exports = {
    getAllDatas : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("laporjual");
        collection = database.collection("datapelapor");
        datas = await collection.find({}).toArray();
        res.json({
            status : "success",
            datas : datas
         })
    },
    insertData : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("laporjual");
        collection = database.collection("datapelapor");
        datas = await collection.insertOne({
            namaSTNK : req.body.namaSTNK,
            nopolSTNK : req.body.nopolSTNK,
            atasnamaSTNK : req.body.atasnamaSTNK,
            statusKendaraan : req.body.statusKendaraan,
            fotostnk : req.body.fotostnk,
            fotoktp : req.body.fotoktp,
            fotokk : req.body.fotokk,
            fotodiri : req.body.fotodiri,
            datapendukung : req.body.datapendukung,
            keterangan : req.body.keterangan,
            tanggal : req.body.tanggal
        })
        res.json({
            status : "success",
            messages : datas
        })
    },
    getAvailableNum : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("availablenumber");
        datas = await collection.find({}).toArray();
        res.json({
            status : "success",
            datas : datas
        })
    },
    getAvailableNumByDate : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("availablenumber");
        datas = await collection.find({
            "tanggal" : req.query.tanggal
        }).toArray();
        res.json({
            status : "success",
            datas : datas
        })
    },
    getNumberListByDate : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlist");
        datas = await collection.find({
            "tanggal" : req.query.tanggal
        }).sort({"nomorsurat" : 1}).toArray()
        res.json({
            status : "success",
            datas : datas
        })
    },
    getNumberList : async (req,res) => {
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlist");
        datas = await collection.find({}).sort({"nomorsurat" : 1}).toArray()
        res.json({
            status : "success",
            datas : datas
        })
    },
    postAvailableNum : async (req,res)=>{
        console.log(req.body)
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("availablenumber");
        datas = await collection.insertOne({
            tanggal :req.body.tanggal,
            jumlahnomor : req.body.jumlahnomor,
            nomor : req.body.nomor
        })
        res.json({
            status : "success",
            messages : datas
        })
    },
    postNumberList : async (req,res)=>{
        console.log(req.body)
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlist");
        datas = await collection.insertOne({
            tanggal : req.body.tanggal,
            nomorsurat : req.body.nomorsurat,
            perihal :req.body.perihal,
            dasarhukum : req.body.dasarhukum,
            pembuatsurat : req.body.pembuatsurat,
            tujuan : req.body.tujuan,
        })
        res.json({
            status : "success",
            messages : datas
        })
    }

}