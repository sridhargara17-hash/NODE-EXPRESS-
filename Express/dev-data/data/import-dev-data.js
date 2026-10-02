const mongoose=require('mongoose')
const dotenv = require('dotenv');
const fs=require('fs')
dotenv.config({ path: './config.env' });

const connectDB = require('../../DataBase/mongoDB')
const Tour=require('../../DataBase/Models/tourModels')
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
DATABASE_URL = process.env.DATABASE
// DATABASE_URL=process.env.DATABASE_LOCAL_URL
connectDB(DATABASE_URL)
const tours =JSON.parse( fs.readFileSync(`${__dirname}/tour.json`, 'utf-8'))
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log("Data successfully loaded");
    } catch(err) {
        console.log(err)
    }
}
const deletetData = async () => {
    try {
        await Tour.deleteMany()
        console.log("Data successfully deleted");
    } catch(err) {
        console.log(err)
    }
}
if (process.argv[2] === '--import') {
   importData()
}
else if (process.argv[2] === '--delete') {
    deletetData()
}
