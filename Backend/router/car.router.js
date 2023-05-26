const express = require("express")
const {carModel} = require("../model/car.model");

const carRouter = express.Router();

carRouter.post("/",async(req,res)=>{
    const payload = req.body
    try{
        const data = new carModel(payload)
        await data.save()
        res.send({Message:"Data Sucessfully Added"})
    }
    catch(e){
        res.send({Message:e.message})
    }
})

carRouter.get('/', async (req, res) => {
    try {
      const { search, color, mileage, price,sort, order} = req.query;
  
      // Create a filter object
      const filter = {};
  
      // Add search query to the filter
      if (search) {
        filter.title= { $regex: search, $options: 'i' };
      }
  
      // Add color filter
      if (color) {
        const colorArray = color.split(',').map(colors => colors.trim());
        filter.color = { $in: colorArray };
      }
  
      // Add mileage filter
      if (mileage) {
        filter.mileage = { $lte: parseInt(mileage) };
      }
  
      // Add price filter
      if (price) {
        filter.price = { $lte: parseInt(price) };
      }

      let sortObject = {};
      if (sort === 'price') {
        sortObject.price = order === 'desc' ? -1 : 1; // Sort by price in ascending or descending order
      } else if (sort === 'mileage') {
        sortObject.mileage = order === 'desc' ? -1 : 1; // Sort by mileage in ascending or descending order
      }
      // Query the database with the filter
      const cars = await carModel.find(filter).sort(sortObject);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ Message: error.message });
    }
  });

  carRouter.get("/:id",async(req,res) => {
    const id = req.params.id;
    try{
        const data = await carModel.findById(id)
        res.send({Message:data})
    }
    catch(e){

    }
  })

  carRouter.patch("/:id",async(req,res) => {
    const id = req.params.id;
    const payload = req.body
    try{
       await carModel.findByIdAndUpdate({_id:id},payload);
        res.send({Message : "Updated"})
    }
    catch(err){
        res.send({Message:err.message})
    }
})

carRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    // const payload = req.body
    try {
        await carModel.findByIdAndDelete({_id:id});
      res.json({Message:"sucessfully Deleted"});
    } catch (error) {
      res.send({Message:error.message})
    }
});


module.exports = {carRouter};