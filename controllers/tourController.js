const fs = require('fs');

//we read the data before we send it. we will read the data so we dont need async but sync
//__dirname is the where the current script app.js is located which is the
// main folder (/Downloads/complete-node-bootcamp-master/complete-node-bootcamp-master/4-natours/starter ).
//Since the file is String we need to parse it to Json object
//Below __dirname is not working b/c directory is now routes folder.
// const tours =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
const tours =JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req,res)=>{
    res.status(200).json({
     //below is json formatting standard
     status:'success',//success,fail, or error
     data:{
         tours:tours
     }
 
    }).catch(err=>{
        res.send(err)
    })
 }


//Getting one tour
//We used it in route.param middleware. Instead of checking for id in every req. This will deter it from happining
exports.isIdExist = (req,res,next,val)=>{
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
    const idList = [];
    tours.forEach(el => {
        idList.push(el.id)
    });
    if(!idList.includes(val*1)){
      //the return is important here. If we don't return then express will continue running and 
      //it will try to send another response which will cause an error.  
      return  res.status(404).json({
            status:'fail',
            message:`No tour exists with id ${req.params.id}`
        })

    }
    next();
}

//: means variable
exports.getTour = (req,res)=>{
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
 
exports.makeTour = (req,res)=>{
    //body is available on the request
    //console.log(req.body);
    const newId = tours[tours.length-1].id+1;
    const newTour= Object.assign({id:newId},req.body)
    tours.push(newTour);
    //now we need to persist data to the file
    console.log(tours)
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours, null, "\t"),(err)=>{ 
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

    exports.updateTour = (req,res)=>{
    //get the file change and then save it again
    let tour = tours.find(el=>el.id===req.params.id*1)
    for(let i=0;i<Object.keys(req.body).length;i++){
    tour[Object.keys(req.body)[i]]=Object.values(req.body)[i]
    }

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours, null, "\t"), (err)=>{
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

exports.deleteTour = (req,res)=>{
const newTours = tours.filter(el=>el.id !== req.params.id*1)
 fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(newTours, null, "\t"), (err)=>{
      //202 => no Content
    res.status(202).json({
        status:'success',
        data:null
    })
})
}  