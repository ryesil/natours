const mongoose = require('mongoose');

 //In order to use mongoose we need schema and model
 //A simple schema w/o options
//  const tourSchema = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     price: Number
//  })
//Schema with options
//mongoose is all about models: that is a blueprint of a document
const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "A tour must have a name"],
        unique:true
    },
    rating: {
        type:Number,
        default:4.5
    },
    price: {
        type:Number,
        required:[true, 'A tour must have a price']
    }
 });

//Time for a module. modules names are capital
const Tour = mongoose.model('Tour',tourSchema);


//We make the schema here but everything else like CRUD we do it in the controllers(tourController)
module.exports = Tour;

//we make a test tour out of the above module
// const testTour = new Tour({
//     name:"The Park Camper",
//     price:993
// })

//save returns the saved document as it is in the DB
// testTour.save().then(doc =>{
//     console.log("here is the data:")
// console.log(doc);
// }).catch(err => {
//     console.log("Error " , err)
// })