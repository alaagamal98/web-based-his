

const express = require('express');
const router = express.Router();
const {Nurse, validateNurse} = require('../models/nurse');



// routes 
//delete
router.delete('/:id', async (req, res) => {
  const nurse = await Nurse.findByIdAndRemove(req.params.id);

  if (!nurse) return res.status(404).send('The nurse with the given ID was not found.');

  res.send(nurse);
});
//................................



router.get("/",async (req, res) => {
  const nurses = await Nurse.find().sort('firstName') ;
  res.send(nurses);
});

router.get("/:id",async (req, res) => {
  const nurse = await Nurse.findById(req.params.id);
  if (!nurse) return res.status(404).send("The nurse with the given ID was not found.");
  res.send(nurse);
});






module.exports = router;