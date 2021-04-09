const MongoClient = require('mongodb').MongoClient;
const config = require('../config.json');

module.exports = async () => {
    const uri = `mongodb+srv://admin:${config.dbPass}@cluster0.baqqz.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const database = await client.connect();
    return database
}




