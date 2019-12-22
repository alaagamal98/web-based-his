

const express = require('express');
const router = express.Router();
const {Room, validateRoom} = require('../models/room');


// routes 
//delete
router.delete('/:id', async (req, res) => {
  const room = await Room.findByIdAndRemove(req.params.id);

  if (!room) return res.status(404).send('The room with the given ID was not found.');

  res.send(room);
});
//............................

router.get("/",async (req, res) => {
  const rooms = await Room.find({}) ;
  res.render('frontend page',{rooms:rooms})
  res.send(rooms);
});

router.get("/:id",async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).send("The room with the given ID was not found.");
  res.send(room);
});


module.exports = router;