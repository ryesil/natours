/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tourModel');

//To fill the areas for the user. Since this is TopFiveTours
//It doesn't have to be async b/c it will be run first then the next query. Look at tourRoutes
exports.aliasTopTours = (req, res,next)=>{
//Since this is a top 5 tours. These fields are predetermined
//We are prefilling these areas
req.query.limit = '5';
req.query.sort = '-ratingsAverage,price';
req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
next();
}


exports.getAllTours = async (req, res) => {

  try{
    //FIRST BUILD THE QUERY
//we will filter according to the req.query
//we need a hardcopy of the query
//console.log(req.query) // Here is what we received GET /api/v1/tours?duration[$gte]=5&difficulty=easy =>{ duration: { '$gte': '5' }, difficulty: 'easy' } 
//1A) FILTERING
const queryObj = {...req.query};
//GET /api/v1/tours?page=4&limit=3&duration[gte]=10 =>{ page: '4', limit: '3', duration: { gte: '10' } }
const excludedFields = ['page', 'sort', 'limit', 'fields'];// we excluded these fields. So that we can work on each seperately later.
//Here we just want to add $ to filter.
excludedFields.forEach(el=>{delete queryObj[el]})

//req.query should look like =>{difficulty: 'easy', duration:{$gte: 5}} we wrote it. Desired
// what we got from /console.log(req.query)=>GET /api/v1/tours?duration[gte]=5&difficulty=easy =>{ duration: { 'gte': '5' }, difficulty: 'easy' } 

//1B)ADVANCED FILTERING
//So we are going to add $ sign. Basic Javascript
let queryStr = JSON.stringify(queryObj);

//replace method returns a callback function which excepts the matched value as an argument
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`) //\b...\b means exact values. Not in a word but  these exact words

//console.log(JSON.parse(queryStr)) //{ duration: { '$gte': '5' }, difficulty: 'easy', price: { '$lt': '1500' }}


//We can chain more methods. That is why we put it in a variable.
let query =  Tour.find(JSON.parse(queryStr));

//2) SORTING
if(req.query.sort){ //req.query is an object. We are looking for sort property
//sorting in case of a tie=> sort('price ratingsAverage')
// in the API, sorting fields will come with a coma. http://localhost:3000/api/v1/tours?sort=-price,ratingsAverage.We will replace it with a space
const sortBy = req.query.sort.split(',').join(' ');

//console.log(sortBy) //GET /api/v1/tours?sort=-price,ratingsAverage => -price ratingsAverage
  query = query.sort(sortBy)

  //default sorting
} else {
  query = query.sort('-createdAt')
}

//3) Field Limiting
if(req.query.fields){
  const fields = req.query.fields.split(',').join(' ');
  query = query.select(fields)
}else{
  //If we use - (minus) in select. It means unselect
  //Some information must be hidden from the client. Then we do it at the schema level. See createdAt
  query = query.select('-__v');
}

//4) Pagination
const page= req.query.page*1 || 1;
const limit = req.query.limit*1 || 100;
const skip = (page-1)*limit;
//http://localhost:3000/api/v1/tours?page=2&limit=10; page1 1-10, page2 11-20, page3 21-30
//query = query.skip(2).limit(10)
query = query.skip(skip).limit(limit)
if(req.query.page){
  const numTours = await Tour.countDocuments();
  if(skip >= numTours){
    throw new Error('This page does not exists');
  }
}


//THEN EXECUTE THE QUERY

//after altering query. It will look like this = query.sort().select().skip().limit()
const tours = await query;


//SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data:{
      tours
    }
  });
} catch(err) {
  res.status(404).json({
    status:'fail',
    message: err
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


exports.makeTour = async (req, res) => {

try {
const newTour = await Tour.create(req.body)

res.status(201).json({
  status:'success',
  data:{
    tour:newTour
  }
})
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

