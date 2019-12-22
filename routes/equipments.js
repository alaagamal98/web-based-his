
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




router.get('/', async(req, res) => {
	const equipments =  await Equipment.find().sort('equipment_name') ;

  res.send(equipments);
});


router.get('/:id', async(req, res) => {
	const equipment = await Equipment.findById(req.params.id);
  if (!equipment) return res.status(404).send('The equipment with the given ID was not found.');
  res.send(equipment);
});





module.exports = router;