const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require('bcryptjs');
const nurses = require("./routes/nurses");
const equipments = require("./routes/equipments");
const mangers = require("./routes/mangers");
const engs = require("./routes/engs");
const doctors = require("./routes/doctors");
const patients = require("./routes/patients");
const medicines = require("./routes/medicines");
const rooms = require("./routes/rooms");
const feedbacks = require("./routes/feedbacks");
const login = require("./routes/login");
const app = express();

// Database connection
mongoose
  .connect("mongodb://localhost/icu")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error(err));

// Route Files
app.use(express.json());
app.use("/api/mangers", mangers);
app.use("/api/engs", engs);
app.use("/api/nurses", nurses);
app.use("/api/equipments", equipments);
app.use("/api/rooms", rooms);
app.use("/api/patients", patients);
app.use("/api/doctors", doctors);
app.use("/api/medicines", medicines);
app.use("/api/feedbacks", feedbacks);
app.use("/api/login", login);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
