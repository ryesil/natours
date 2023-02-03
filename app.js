const express = require('express');
const fs = require('fs');
const app=express();

//middleware is a function stands between req and res. 
//before the below code we did a post and it didn't work.
//The post worked with the below midleware code
app.use(express.json());

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

//we read the data before we send it. we will read the data so we dont need async but sync
//__dirname is the where the current script app.js is located which is the
// main folder (/Downloads/complete-node-bootcamp-master/complete-node-bootcamp-master/4-natours/starter ).
//Since the file is String we need to parse it to Json object
const tours =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours',(req,res)=>{
   res.status(200).json({
    //below is json formatting standard
    status:'success',//success,fail, or error
    data:{
        tours:tours
    }

   })
})

console.log(tours);

app.post('/api/v1/tours',(req,res)=>{
//body is available on the request
//console.log(req.body);
const newId = tours[tours.length-1].id+1;
const newTour= Object.assign({id:newId},req.body)
tours.push(newTour);
//now we need to persist data to the file
console.log(tours)
fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),(err)=>{ 
    res.status(201).json({
        status:"success",
        data:{
            newTour:newTour
        }
    }).catch(err=>{
        res.send("eben")
    })
}) 
})

//Getting one tour
app.get('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params.id)
    const tour= tours.find(el=>':'+el.id === req.params.id)
 res.status(200).json(
    {
        status:'success',
        data:{
            tour:tour
        }
    }
 )
    // })
 })

const port=3000;
app.listen(port,()=>{'/'
    console.log(`App is running on port ${port}...`)
});


