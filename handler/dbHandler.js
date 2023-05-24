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
    sentWAstatus: async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("whatsapush");
        collection = database.collection("sent");
        datas = await collection.insertOne({
            success : req.body.success,
            unregistered : req.body.unregistered,
            unvalid : req.body.unvalid,
            none : req.body.none,
            total : req.body.total,
            date : new Date(),
            city : req.body.city
        })
        res.json({
            status : "success",
            datas : req.body
        })

        },
    sentWAreport : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("whatsapush");
        collection = database.collection("sent");
        datas = await collection.find({}).sort({"date":-1}).toArray();
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
    getUserPIG : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("pig");
        collection = database.collection("user");
        console.log(req.query.nik)
        datas = await collection.find({
            "nik" : req.params.nik
        }).toArray();
        res.json({
            status : "success",
            datas : datas
        })
    },
    getUserPIGbyInstitute : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("pig");
        collection = database.collection("user");
        console.log(req.params.institution)
        datas = await collection.find({
            "instansi" : req.params.institution
        }).toArray();
        res.json({
            status : "success",
            datas : datas
        })
    },
    getAllReport : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("pig");
        collection = database.collection("laporan");
        console.log(req.params.institution)
        datas = await collection.find({}).toArray();
        res.json({
            status : "success",
            datas : datas
        })
    },
    sendReport : async (req,res)=>{
        console.log(req.body.inspelapor)
        connection = await connectionHandler();
        database = connection.db("pig");
        collection = database.collection("laporan");
        datas = await collection.insertOne({
            inspelapor :req.body.inspelapor,
            insterlapor : req.body.insterlapor,
            laporan : req.body.laporan,
            pelapor : req.body.pelapor,
            terlapor : req.body.terlapor
        })
        res.json({
            status : "success",
            
            messages : datas
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