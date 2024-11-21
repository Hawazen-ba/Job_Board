const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors =require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const port = 5002;
app.listen(port , ()=>{
    console.log(`Server running on port ${port}`);
})


connectDB();