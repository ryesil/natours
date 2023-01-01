const express = require('express');
const tourController = require('../controllers/tourController')


const router = express.Router();


//if no id then ignored
//In the param middleware we have access to the id. so it is like router.param('id',(req,res,next,val)=>{})
router.param('id',tourController.isIdExist)

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody,tourController.makeTour)

// app
// .route('/api/v1/tours')
// .get(getAllTours).post(makeTour)
// app.get('/api/v1/tours/:id',getTour)
//put receives entire updated object
//patch receives properties that are updated on the object
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router;