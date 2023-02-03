const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs=require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../config.env' });


const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)


//Read json file JSON.parse converts json to javascript object
const tours =  JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))
//Make database connection
mongoose.connect(DB, {

 }).then(() => console.log("Database Connection successful"))


 //Import Data into database
const importData = async ()=>{

    try{
        //Tour.create makes a documents in the collection. Tour is using the giving schema to check whether the passed data is ok.
        //Then it is passing it to the database
        await Tour.create(tours)
        console.log('Data successfully loaded')
    }catch(err){
        console.log(err)
    }    
    process.exit()
}

//Delete all data from database

const deleteData =async()=>{
    try{
        //Tour.create makes a documents in the collection.
        await Tour.deleteMany()
        console.log('Data successfully deleted')
    }catch(err){
        console.log(err)
    }    
    process.exit()
}


// process.argv this is the array of running the node process
//[node, import-dev-data.js,]
//Third arg is [node import-dev-data.js --import] we chose it
console.log(process.argv)


//When we specify import it will import the data to the database. If it is --delete it will delete the data
if(process.argv[2]==='--import'){
    importData()
} else if(process.argv[2] === '--delete' ){
    deleteData();
}