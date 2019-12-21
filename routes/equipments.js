
const express = require("express");
const router = express.Router();
const {Equipment, validateEquipment} = require('../models/equipment');



// routes 
//delete
router.delete('/:id', async (req, res) => {
  const equipment = await Equipment.findByIdAndRemove(req.params.id);

  if (!equipment) return res.status(404).send('The equipment with the given ID was not found.');

  res.send(equipment);
});
//...........................


async function getEquipments() {
    return await Equipment;
  }
  
  
  router.get('/', (req, res) => {
      const equipments = getEquipments();
    res.send(equipments);
  });
  
  
  router.get('/:id', (req, res) => {
      const equipments = getEquipments();
    const equipment = equipments.find(c => c.id === parseInt(req.params.id));
    if (!equipment) return res.status(404).send('The equipment with the given ID was not found.');
    res.send(equipment);
  });





module.exports = router;