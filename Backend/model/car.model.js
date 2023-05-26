const mongoose = require('mongoose');

// Define the Car schema
const carSchema = mongoose.Schema({
  image: {type: String,required: true},
  title: {type: String,required: true},
  brand:{type: String,required: true},
  year: {type: Number,required: true},
  price: {type: Number,required: true},
  mileage: {type: Number,required: true},
  color: {type: String,required: true},
  accidents: {type: Number,required:true},
  previousBuyers: {type: Number, required: true},
  registrationPlace: {type: String,required: true}
},{
    versionKey : false
});

// Create the Car model
const carModel = mongoose.model('car', carSchema);

// Export the Car model
module.exports = {carModel};
