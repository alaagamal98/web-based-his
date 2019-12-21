

const express = require('express');
const router = express.Router();
const {Nurse, validateNurse} = require('../models/nurse');



// routes 


async function getNurses() {
  return await Nurse;
}


router.get('/', (req, res) => {
	const nurses = getNurses();
  res.send(nurses);
});


router.get('/:id', (req, res) => {
	const nurses = getNurses();
  const nurse = nurses.find(c => c.id === parseInt(req.params.id));
  if (!nurse) return res.status(404).send('The nurse with the given ID was not found.');
  res.send(nurse);
});





module.exports = router;