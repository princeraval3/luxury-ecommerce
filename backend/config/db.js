const mongoose = require('mongoose')

const ConnectDB = async ()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected ");

        
    } catch (error) {
        console.error("Mongo connecation faid  "+ error);

        
    }

}


module.exports = ConnectDB