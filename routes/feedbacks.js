
const express = require('express');
const router = express.Router();
const {Feedback, validateFeedback} = require('../models/feedback');



async function getFeedbacks() {
    return await Feedback;
  }
  
  
  router.get('/', (req, res) => {
      const feedbacks = getFeedbacks();
    res.send(feedbacks);
  });
  
  
  router.get('/:id', (req, res) => {
      const feedbacks = getFeedbacks();
    const feedback = feedbacks.find(c => c.id === parseInt(req.params.id));
    if (!feedback) return res.status(404).send('The feedback with the given ID was not found.');
    res.send(feedback);
  });



module.exports = router;