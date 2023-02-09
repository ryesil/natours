const express = require('express');
const tourController = require('../controllers/tourController')


const router = express.Router();

//Here we are writing a route for 5 best then cheapest tours
//Get URL will look like this http://localhost:3000/api/v1/tours?limit=5&sort=-ratingsAverage,-price
//It will have some params that we can pass into the route. We make tohse fields
//To make the params we will use another middleWare first aliasTopTours. Then we use getAllTours.
//So user enters http://localhost:3000/api/v1/tours/top-5-cheap=> Then we convert it to http://localhost:3000/api/v1/tours?limit=5&sort=-ratingsAverage,-price
router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.makeTour)

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router;