
const express = require("express");
const router = express.Router();
const { Eng, validateEng } = require("../models/eng");

// routes 

router.put('/:id', async (req, res) => {
  const { error } = validateEng(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const eng = await Eng.findByIdAndUpdate(req.params.id,
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

    if (!eng) return res.status(404).send('The engineer with the given ID was not found.');
  
  res.send(eng);
});

//delete
router.delete('/:id', async (req, res) => {
  const eng = await Eng.findByIdAndRemove(req.params.id);

  if (!eng) return res.status(404).send('The eng with the given ID was not found.');

  res.send(eng);
});
//.....................



router.get('/', async(req, res) => {
	const engs =  await Eng.find().sort({}) ;
  res.render('frontend page',{engs:engs})
  res.send(engs);
});


router.get('/:id', async(req, res) => {
	const eng = await Doctor.findById(req.params.id);
  if (!eng) return res.status(404).send('The engineer with the given ID was not found.');
  res.send(eng);
});




module.exports = router;