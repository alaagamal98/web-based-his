const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { Eng, validateEng } = require("../models/eng");

// routes
// Add eng
router.post("/add_eng", async (req, res) => {
  // Validate The Request
  const { error } = validateEng(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if already exisits
  let eng = await Eng.findOne({ ssn: req.body.ssn });
  if (eng) {
    return res.status(400).send("That eng already exisits!");
  } else {
    // Insert the new eng if they do not exist yet
    eng = new Eng(
      _.pick(req.body, [
        "ssn",
        "firstName",
        "lastName",
        "email",
        "gender",
        "password",
        "salary",
        "phone_number"
      ])
    );
    const salt = await bcrypt.genSalt(10);
    eng.password = await bcrypt.hash(eng.password, salt);
    await eng.save();
    res.send(eng);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  const eng = await Eng.findByIdAndRemove(req.params.id);

  if (!eng)
    return res.status(404).send("The eng with the given ID was not found.");

  res.send(eng);
});
//.....................

async function getEngs() {
  return await Eng;
}

router.get("/", (req, res) => {
  const engs = getDoctors();
  res.send(engs);
});

router.get("/:id", (req, res) => {
  const engs = getEngs();
  const eng = engs.find(c => c.id === parseInt(req.params.id));
  if (!eng)
    return res
      .status(404)
      .send("The engineer with the given ID was not found.");
  res.send(eng);
});

module.exports = router;
