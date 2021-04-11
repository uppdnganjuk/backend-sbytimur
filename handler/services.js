const config = require("../config.json");

module.exports = {
    checkConnection : ()=>{
        console.log(`Connected to port ${config.port}`);
    }
}