const config = require("../config.json");
const dbhandler = require("./dbHandler");
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const fs = require("fs");
const db = require("../database/db");

let sessionData;
let SESSION_FILE_PATH = "../session.json"

const checkNumberFormat = (nomor)=>{
    switch (nomor[0]) {
        case "0":
            return "62" + nomor.substring(1)
        case "6":
            return nomor;
        case "+":
            return nomor.substring(1);
        default:
            return "False"
    }
}

module.exports = {
    checkConnection : ()=>{
        console.log(`Connected to port ${config.port}`);
    },
    whatsAppPush : (req,res)=>{
        let phonenumbers = [];
        if(fs.existsSync(SESSION_FILE_PATH)) {
            sessionData = require(SESSION_FILE_PATH);
        }
        const client = new Client({
            session: sessionData
        });
        client.on("authenticated",async (session)=>{
            sessionData = session;
            fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
                if (err) {
                    console.error(err);
                }
            });
        })
        client.on('qr', async (qr) => {
            console.log("Getting the databases...")
            phonenumbers = await dbhandler.getAllPhoneNumber();
            console.log(phonenumbers)
            console.log("Databases are ready")
            console.log('QR RECEIVED', qr);
            qrcode.generate(qr);
        });
        
        client.on('ready', async () => {
            for (let index = 0; index < phonenumbers.length; index++) {
                    const number = checkNumberFormat(phonenumbers[index].nomor)
                    if (number == "False") {
                        console.log(`Nomor Bapak/Ibu ${phonenumbers[index].nama} dengan nopol ${phonenumbers[index].nopol} dan nomor ${number} tidak valid`)
                        return;
                    }
                    const text = req.body.text;
                    const chatId = number + "@c.us";
                    await client.sendMessage(chatId,text)
                    console.log(`Pesan kepada Bapak/Ibu ${phonenumbers[index].nama} dengan nopol ${phonenumbers[index].nopol} dan nomor ${number} berhasil dikirim`)
            }
            res.json({
                status : "Berhasil"
            })
        });
        
        client.initialize();
    }
}