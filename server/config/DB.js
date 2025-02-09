const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();


const connectDb =  async ()=>{

    await mongoose.connect(process.env.MONGO_DB)
    .then(()=>{console.log("Connect to MongoDB successfully")})
    .catch((error)=>{console.log("there are an error : " , error)});
} 

module.exports = connectDb
    