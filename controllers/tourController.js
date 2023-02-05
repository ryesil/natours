/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {

  try{
    //FIRST BUID THE QUERY
//we will filter according to the req.query
//we need a hardcopy of the query
const queryObj = {...req.query};
//So we remove the following keys from URL since we will handle them later. 
const excludedFields = ['page', 'sort', 'limit', 'fields'];
excludedFields.forEach(el=>{delete queryObj[el]})
//Original query finder without filtering
// const tours = await Tour.find({});
//with filtering For more about query() object You can check the documentation
//THEN EXECUTE THE QUERY
const query =  Tour.find(queryObj);
const tours = await query;

//SEND RESPONSE
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

