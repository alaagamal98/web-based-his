

const express = require('express');
const router = express.Router();
const {Medicine, validateMedicine} = require('../models/medicine');


// routes 
//delete
router.delete('/:id', async (req, res) => {
  const medicine = await Medicine.findByIdAndRemove(req.params.id);

  if (!medicine) return res.status(404).send('The medicine with the given ID was not found.');

  res.send(medicine);
});
//..............................



async function getMedicines() {
    return await Medicine;
  }
  


  router.get("/",async (req, res) => {
    const medicines = await Medicine.find().sort('firstName') ;
    res.send(medicines);
  });
  
  router.get("/:id",async (req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).send("The medicine with the given ID was not found.");
    res.send(medicine);
  });
  




module.exports = router;