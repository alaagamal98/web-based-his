

const express = require('express');
const router = express.Router();
const {Medicine, validateMedicine} = require('../models/medicine');


// routes 




async function getMedicines() {
    return await Medicine;
  }
  
  
  router.get('/', (req, res) => {
      const medicines = getMedicines();
    res.send(medicines);
  });
  
  
  router.get('/:id', (req, res) => {
      const medicines = getMedicines();
    const medicine = medicines.find(c => c.id === parseInt(req.params.id));
    if (!medicine) return res.status(404).send('The medicine with the given ID was not found.');
    res.send(medicine);
  });





module.exports = router;