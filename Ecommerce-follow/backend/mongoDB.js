const mongoose = require('mongoose');


async function connect() {
    try{
        await mongoose.connect('mongodb+srv://kakihari03:kakihari03@cluster0.u2z7p.mongodb.net/')
    }catch(err){
        console.log("Mongo db error:",err);
    }
}


module.exports = connect;