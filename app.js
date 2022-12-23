const e = require('express');
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
const isIdExist = (tours,id)=>{
    const idList = [];
    tours.forEach(el => {
        idList.push(el.id)
    });
    return tours.includes(id*1)
}


const getAllTours = (req,res)=>{
    res.status(200).json({
     //below is json formatting standard
     status:'success',//success,fail, or error
     data:{
         tours:tours
     }
 
    })
 }

//Getting one tour
//: means variable
const getTour = (req,res)=>{
    // app.get('/api/v1/tours/:id/:x/:v/:f/:r/:e?',(req,res)=>{
        //Question mark at the end makes it optional not required
        //Here is the log => { id: ':4', x: ':5', v: ':6', f: ':7', r: ':8', e: ':9' }
        //keys are the ones we define here in the path. Values come from the get request.
        const toursLength = tours.length;
        console.log(req.params)
        const id = req.params.id*1;
        //If there is no tour it will be undefined
        const tour= tours.find(el=> el.id === id)
        
        //if(id>toursLength-1){
        if(!tour){
            res.status(404).json({
                status:"fail",
                message:`No such tour exists with ${id}`
            }
            )
        } else{
     res.status(200).json(
        {
            status:'success',
            data:{
                //tour:tour
                tour
            }
        }
     )
    }
        }
 
const makeTour = (req,res)=>{
    //body is available on the request
    //console.log(req.body);
    const newId = tours[tours.length-1].id+1;
    const newTour= Object.assign({id:newId},req.body)
    tours.push(newTour);
    //now we need to persist data to the file
    console.log(tours)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, "\t"),(err)=>{ 
        res.status(201).json({
            status:"success",
            data:{
                newTour:newTour
            }
        }).catch(err=>{
            res.send("eben")
        })
    }) 
    }  
 const updateTour = (req,res)=>{
    //get the file change and then save it again
    if(isIdExist(tours,req.params.id)){
        res.status(404).json({
            status:"fail",
            message:`There is no such tour with ID: ${req.params.id}`
        })
        return
    }
    let tour = tours.find(el=>el.id===req.params.id*1)
    for(let i=0;i<Object.keys(req.body).length;i++){
    tour[Object.keys(req.body)[i]]=Object.values(req.body)[i]
    }
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours, null, "\t"), (err)=>{
        res.status(200).json({
            status:"success",
            data:{
                tour
            }
        }
        
        ).catch(err=>console.log(err))
    })
    //console.log(req.body)
    }
 const deleteTour = (req,res)=>{

    if(isIdExist(tours,req.params.id)){
        res.status(404).json({
            status:"fail",
            message:`No such id ${req.params.id}`
        })
    }

 const newTours = tours.filter(el=>el.id !== req.params.id*1)
 fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(newTours, null, "\t"), (err)=>{
      //202 => no Content
    res.status(202).json({
        status:'success',
        data:null
    }).catch(err=>console.log(err))
})
}   

// app.get('/api/v1/tours',getAllTours)
// app.post('/api/v1/tours',makeTour)
app
.route('/api/v1/tours')
.get(getAllTours).post(makeTour)
// app.get('/api/v1/tours/:id',getTour)
//put receives entire updated object
//patch receives properties that are updated on the object
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)

app
.route('/api/v1/tours/:id')
.get(getTour).patch(updateTour)
.delete(deleteTour)


const port=3000;
app.listen(port,()=>{'/'
    console.log(`App is running on port ${port}...`)
});


