const { ObjectId } = require("bson");
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
        console.log(new Date(req.query.tanggal))
        datas = await collection.find({
            tanggal : {
                $lte : new Date(req.query.tanggal),
                $gte : new Date(req.query.tanggal)
            }
        }).sort({"nomorsurat" : 1}).toArray()
        console.log(datas)
        res.json({
            status : "success",
            datas : datas
        })
    },
    getNumberListByDateEntry : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlist");
        datas = await collection.find({ 
            entrydate : {
                $gte: new Date(req.params.gt),
                $lte:new Date(req.params.lt)
            }
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
        console.log(datas.map(data=> data.nomorsurat))
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
            tanggal : new Date(req.body.tanggal),
            entrydate : new Date(req.body.entrydate),
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
    },
    deleteNumberList : async(req,res)=>{
        console.log(ObjectId(req.params.id))
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlist");
        datas = await collection.deleteOne({
            _id : ObjectId(req.params.id)
        })
        res.json({
            status : "success",
            messages : datas
        })
    },
    deleteNumberAvailable : async(req,res)=>{
        console.log(ObjectId(req.params.id))
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("availablenumber");
        datas = await collection.deleteOne({
            _id : ObjectId(req.params.id)
        })
        res.json({
            status : "success",
            messages : datas
        })
    },
    getNumberListByDateMasuk : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlistmasuk");
        datas = await collection.find({
            "tanggal" : req.query.tanggal
        }).sort({"nomorsurat" : 1}).toArray()
        res.json({
            status : "success",
            datas : datas
        })
    },
    getNumberListMasuk : async (req,res) => {
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlistmasuk");
        datas = await collection.find({}).sort({"nomorsurat" : 1}).toArray()
        console.log(datas.map(data=> data.nomorsurat))
        res.json({
            status : "success",
            datas : datas
        })
    },
    postNumberListMasuk : async (req,res)=>{
        console.log(req.body)
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlistmasuk");
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
    },
    deleteNumberListMasuk : async(req,res)=>{
        console.log(ObjectId(req.params.id))
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlistmasuk");
        datas = await collection.deleteOne({
            _id : ObjectId(req.params.id)
        })
        res.json({
            status : "success",
            messages : datas
        })
    },
    getNumberListByDateSpec : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlist");
        datas = await collection.find({ 
            tanggal : {
                $gte: new Date(req.params.gt),
                $lte:new Date(req.params.lt)
            }
        }).sort({"nomorsurat" : 1}).toArray()
        res.json({
            status : "success",
            datas : datas
        })
    },
    getAllPhoneNumber : async ()=>{
        connection = await connectionHandler();
        database = connection.db("nomorhp");
        collection = database.collection("nomorhp");
        datas = await collection.find({}).toArray();
        return datas;
    },
    getAllPhoneByUser : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorhp");
        collection = database.collection("nomorhp");
        datas = await collection.find({}).toArray();
        res.json({
            status : "success",
            datas : datas
        })
    }

}