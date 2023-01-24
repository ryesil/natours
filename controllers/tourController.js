/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};


//: means variable
exports.getTour = (req, res) => {

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
  message:"Invalid data sent!"
})

}

};



exports.updateTour = (req, res) => {
 
};

exports.deleteTour = (req, res) => {

};

