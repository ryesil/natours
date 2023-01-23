//This is where we do all the setup for our application
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Careful above dotenv must be read before app. Otherwise we cannot read the config file in the app.js
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)

//Below we connected to the Atlas database. IF we use local we just change the name to local
//Below first we provide the db then put in some options for deprecation warnings
mongoose.connect(DB, {
// useNewUrlParse:true,
// useCreateIndex: true,
// useFindAndModify: false
//connect method returns a promise below then
//it gets access to the connection object
// }).then(con => {
// console.log(con.connections);
// console.log("db Connection successful")
 }).then(() => console.log("Database Connection successful"))

 //In order to use mongoose we need schema and model
 //A simple schema w/o options
//  const tourSchema = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     price: Number
//  })
//Schema with options
const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "A tour must have a name"],
        unique:true
    },
    rating: {
        type:Number,
        default:4.5
    },
    price: {
        type:Number,
        required:[true, 'A tour must have a price']
    }
 });

//Time for a module. modules names are capital
const Tour = mongoose.model('Tour',tourSchema)

const app = require('./app');
//prints all the environment variables and process.env has access to them
//console.log(process.env);

//gives us the environment type==> development
//console.log(app.get('env'))

//prints all the environment variables
//console.log(process.env);


//process.env.PORT is already defined in the config.env file
const port=process.env.PORT || 3000;
app.listen(port,()=>{'/'

    console.log(`App is running on port ${port}...`)
});