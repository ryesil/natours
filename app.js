const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');
const express = require('express');
const app=express();

//middleware is a function stands between req and res. 
//before the below code we did a post and it didn't work.
//The post worked with the below midleware code
//It parses incoming requests with JSON payloads and is based on body-parser. 
//morgan is to log coming req

app.use(morgan('dev'))
app.use(express.json());

app.param



//In each middleware function, we have req, res, and next function
// app.use((req,res,next)=>{
//     //in every req this will popup b/c we put a middleware in to the pipeline
//     console.log("Hello from the middleWare");
//     //we gotta use next function to move on to the next middleware
//     next();
// })


// //we can do all http request using the same url.
// app.get('/',(req,res)=>{
// //res.status(200).send('Hello from the server side!');
// //instead of sending a string we can send a json object
// res
// .status(200)
// .json({response:'Hello from the server side!',app:'Natours', firstName:'Ramazan', lastName:"yesil"})
// })

// //add new data
// app.post('/',(req,res)=>{
//     res.status(200).json({response:"You can post to URL"})
// })

// //major update
// app.patch('/',(req,res)=>{
//     res.end("You can patch to this endPoint")
// })

// //minor update
// app.put('/',(req,res)=>{
//     res.end("You can patch to this endPoint")
// })
// app.put('/',(req,res)=>{
//     res.status(200).json({
//         response:"You can put to this endPoint"
//     })
// })









// app.get('/api/v1/tours',getAllTours)
// app.post('/api/v1/tours',makeTour)



//ROUTES (Mounting) We cannot use them before we declare them
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)



// app
// .route('/api/v1/tours/:id')
// .get(getTour).patch(updateTour)
// .delete(deleteTour)


// app.route('/api/v1/users')
// .get(getAllUsers)
// .post(createUser)



// app.route('/api/v1/users/:id')
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUSer)





module.exports = app;
