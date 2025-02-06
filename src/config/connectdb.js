const mongoose = require('mongoose');

require('dotenv').config()

const connect = async () =>{
    try{
        const uri = `mongodb://${process.env.HOST_NOSQL}:${process.env.PORT_NOSQL}/${process.env.DATABASE_NOSQL}`;
        await mongoose.connect(uri)
                .then(() => console.log('Connect MongoDb Successfully!!!'));
        
    }catch(e){
        console.log('Connect MongoDb Failed: ',e);
    }
}
module.exports = { connect };