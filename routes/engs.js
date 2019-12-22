
const express = require("express");
const router = express.Router();
const { Eng, validateEng } = require("../models/eng");

// routes 

//delete
router.delete('/:id', async (req, res) => {
  const eng = await Eng.findByIdAndRemove(req.params.id);

  if (!eng) return res.status(404).send('The eng with the given ID was not found.');

  res.send(eng);
});
//.....................



router.get('/', async(req, res) => {
	const engs =  await Eng.find().sort('firstName') ;

  res.send(engs);
});


router.get('/:id', async(req, res) => {
	const eng = await Doctor.findById(req.params.id);
  if (!eng) return res.status(404).send('The engineer with the given ID was not found.');
  res.send(eng);
});




module.exports = router;