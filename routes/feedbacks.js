
const express = require('express');
const router = express.Router();
const {Feedback, validateFeedback} = require('../models/feedback');


router.get("/",async (req, res) => {
  const feedbacks = await Feedback.find() ;
  res.send(doctors);
});

router.get("/:id",async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) return res.status(404).send("The feedback with the given ID was not found.");
  res.send(feedback);
});


module.exports = router;