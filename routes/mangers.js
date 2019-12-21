
const express = require('express');
const router = express.Router();
const {Manger, validateManger} = require('../models/manger.js');

// routes 


async function getMangers() {
  return await Manger;
}


router.get('/', (req, res) => {
	const mangers = getDoctors();
  res.send(mangers);
});


router.get('/:id', (req, res) => {
	const mangers = getMangers();
  const manger = mangers.find(c => c.id === parseInt(req.params.id));
  if (!manger) return res.status(404).send('The manger with the given ID was not found.');
  res.send(manger);
});





module.exports = router;