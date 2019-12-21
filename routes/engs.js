
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

async function getEngs() {
  return await Eng;
}


router.get('/', (req, res) => {
	const engs = getDoctors();
  res.send(engs);
});


router.get('/:id', (req, res) => {
	const engs = getEngs();
  const eng = engs.find(c => c.id === parseInt(req.params.id));
  if (!eng) return res.status(404).send('The engineer with the given ID was not found.');
  res.send(eng);
});




module.exports = router;