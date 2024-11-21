const mongoose = require('mongoose');
const dotenv = require('dotenv');

const path = require('path');

// Load environment variables from .env file

dotenv.config({ path: path.join( 'variable.env') });



const connectDB = async () =>{
    console.log('connecting to your DataBase ...');
    try{
      let db = process.env.URI ;
      await mongoose.connect(db);
      console.log('Connected to DataBase');
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
};
module.exports   = connectDB;