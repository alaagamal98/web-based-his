

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


async function getRooms() {
    return await Room;
  }
  
  
  router.get('/', (req, res) => {
      const rooms = getRooms();
    res.send(rooms);
  });
  
  
  router.get('/:id', (req, res) => {
      const rooms = getRooms();
    const room = rooms.find(c => c.id === parseInt(req.params.id));
    if (!room) return res.status(404).send('The room with the given ID was not found.');
    res.send(room);
  });





module.exports = router;