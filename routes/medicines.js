

const express = require('express');
const router = express.Router();
const {Medicine, validateMedicine} = require('../models/medicine');


// routes 


router.put('/:id', async (req, res) => {
  const { error } = validateMedicine(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const medicine = await Manger.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      quantity: req.body.quantity,
      date: req.body.date,
      dose: req.body.dose,
      price: req.body.price,
      replacements: req.body.replacements,

    }, { new: true });

    if (!medicine) return res.status(404).send('The medicine with the given ID was not found.');
  
  res.send(medicine);
});


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
    const medicines = await Medicine.find({}) ;
    res.render('frontend page',{medicines:medicines})
    res.send(medicines);
  });
  
  router.get("/:id",async (req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).send("The medicine with the given ID was not found.");
    res.send(medicine);
  });
  




module.exports = router;