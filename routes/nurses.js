

const express = require('express');
const router = express.Router();
const {Nurse, validateNurse} = require('../models/nurse');



// routes 

router.put('/:id', async (req, res) => {
  const { error } = validateNurse(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const nurse = await Eng.findByIdAndUpdate(req.params.id,
    { 
      ssn: req.body.ssn,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      salary: req.body.salary,
      phone_number: req.body.phone_number,
      password: req.body.password

    }, { new: true });

    if (!nurse) return res.status(404).send('The nurse with the given ID was not found.');
  
  res.send(nurse);
});

//delete
router.delete('/:id', async (req, res) => {
  const nurse = await Nurse.findByIdAndRemove(req.params.id);

  if (!nurse) return res.status(404).send('The nurse with the given ID was not found.');

  res.send(nurse);
});
//................................



router.get("/",async (req, res) => {
  const nurses = await Nurse.find({}) ;
  //res.render('frontend page',{nurses:nurses})
  res.send(nurses);
});

router.get("/:id",async (req, res) => {
  const nurse = await Nurse.findById(req.params.id);
  if (!nurse) return res.status(404).send("The nurse with the given ID was not found.");
  res.send(nurse);
});






module.exports = router;