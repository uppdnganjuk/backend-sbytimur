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
        avaiblecheck = await collection.find({"nomorsurat":req.body.nomorsurat,"tanggal":new Date(req.body.tanggal)}).toArray()
        console.log("isAvailable")
        console.log(avaiblecheck)
        console.log(avaiblecheck.length)
        if(avaiblecheck.length == 0){
            datas = await collection.insertOne({
                tanggal : new Date(req.body.tanggal),
                entrydate : new Date(),
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
        }else{
            res.json({
                status : "exist",
                message : "none"
            })
        }
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
    getRecentNumberList : async (req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlist")
        datas = await collection.find({}).sort({"entrydate":-1}).limit(parseInt(req.params.number)).toArray()
        res.json({
            status : "success",
            datas : datas
        })
    },
    updateNumberList : async(req,res)=>{
        connection = await connectionHandler();
        database = connection.db("nomorsurat");
        collection = database.collection("numberlist");
        let query = {"nomorsurat":req.body.nomorsurat,"tanggal":new Date(req.body.tanggal)}
        const update = {$set:{
            tanggal : new Date(req.body.tanggal),
            nomorsurat : req.body.nomorsurat,
            perihal :req.body.perihal,
            dasarhukum : req.body.dasarhukum,
            pembuatsurat : req.body.pembuatsurat,
            tujuan : req.body.tujuan,
        }}
        console.log(update)
        datas = await collection.updateOne(query,update,{})
        res.header("Access-Control-Allow-Methods", "PUT");
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