
const express = require('express');
const router = express.Router();
const {Manger, validateManger} = require('../models/manger.js');

// routes 
//delete
router.delete('/:id', async (req, res) => {
  const manger = await Manger.findByIdAndRemove(req.params.id);

  if (!manger) return res.status(404).send('The manger with the given ID was not found.');

  res.send(manger);
});
//.................

async function getMangers() {
  return await Manger;
}



router.get("/",async (req, res) => {
  const managers = await Manger.find().sort('firstName') ;
  res.send(managers);
});

router.get("/:id",async (req, res) => {
  const manager = await Manger.findById(req.params.id);
  if (!manager) return res.status(404).send("The manager with the given ID was not found.");
  res.send(manager);
});



module.exports = router;