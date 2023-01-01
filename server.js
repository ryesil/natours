const dotenv = require('dotenv');
//Careful above dotenv must be read before app. Otherwise we cannot read the config file in the app.js
dotenv.config({ path: './config.env' });

const app = require('./app');
//prints all the environment variables and process.env has access to them
//console.log(process.env);

//gives us the environment type==> development
//console.log(app.get('env'))

//prints all the environment variables
//console.log(process.env);


//rocess.env.PORT is already defined in the config.env file
const port=process.env.PORT || 3000;
app.listen(port,()=>{'/'

    console.log(`App is running on port ${port}...`)
});