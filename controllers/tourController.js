/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {

  try{
    //We can get the filtering from the URL(after the ? mark) by using req.query
    //http://localhost:3000/api/v1/tours?duration=5&difficulty=easy returns { duration: '5', difficulty: 'easy' }
    //console.log(req.query)
   //There are two ways of filtering first reqular mongodb find query
   //const tours = await Tour.find({duration:5,difficulty:'easy'})
    //Second way using mongoose way
    //const tour = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')
    

  const tours = await Tour.find({});
  res.status(200).json({
    status: 'success',
    data:{
      tours
    }
  });
} catch(err) {
  res.status(401).json({
    status:'fail',
    message:"Bad Request"
  })
}
};


//: means variable
exports.getTour = async (req, res) => {
try{
const tour = await Tour.findById(req.params.id)
res.status(200).json({
  status:'success',
  data:{
    tour
  }
})

}catch(err){
res.status(401).json({
  status:"fail",
  message:"There is no tour with the given ID"
})

}

};

// We used try catch b/c of the async/await (promise return)
exports.makeTour = async (req, res) => {
 //req.body
 //we did using model like let newTour = new Tour({...})
//newTour.save(); Below is the new Way. Returns a promise
//Since Tour is an async function we can write async at the begining of the function insted of writing then() below
try {
const newTour = await Tour.create(req.body)

res.status(201).json({
  status:'success',
  data:{
    tour:newTour
  }
})//validation error will be taken 4oo is for bad request
} catch(err) {
res.status(400).json({
  status:'fail',
  //For now
  message:err
})

}

};



exports.updateTour = async (req, res) => {
 
try{
  //findAndUpdate receives 3 params: id, body, and options
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new:true,
    runValidators:true
  });
  res.status(200).json({
    status:'success',
    data:{
      tour
    }
  })


} catch(err){
  res.status(401).json({
    status:'fail',
    message:"Bad Request"
  })
}

};

exports.deleteTour = async (req, res) => {

try{
  await Tour.findByIdAndDelete(req.params.id)
  res.status(202).json({
    status: 'success',
    data: null
  })
} catch(err){
  res.status(404).json({
    status:'fail',
    message:"Interior Communication Error. Please talk to your supervisor"
  })
}
};

