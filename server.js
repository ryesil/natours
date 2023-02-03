//All we want in this server is the database connection.
const mongoose = require('mongoose');
//This is where we do all the setup for our application
const dotenv = require('dotenv');
//Careful above dotenv must be read before app. Otherwise we cannot read the config file in the app.js
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)
const app = require('./app');

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