// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");

// // Import doctor model
// let Doctor = require("../models/doctor");

// // Add Doctor
// router.post("/add_doctor", (req, res) => {
//   const number = req.body.number;
//   const ssn = req.body.ssn;
//   const first_name = req.body.first_name;
//   const middle_name = req.body.middle_name;
//   const last_name = req.body.last_name;
//   const email = req.body.email;
//   const gender = req.body.gender;
//   const salary = req.body.salary;
//   const phone_number = req.body.phone_number;
//   const password = req.body.password;
//   const password2 = req.body.password;
//   const patients = req.body.patients;

//   req.checkBody("name", "Name is required").notEmpty();
//   req.checkBody("email", "Email is required").notEmpty();
//   req.checkBody("email", "Email is not valid").isEmail();
//   req.checkBody("username", "Username is required").notEmpty();
//   req.checkBody("password", "Password is required").notEmpty();
//   req
//     .checkBody("password2", "Passwords do not match")
//     .equals(req.body.password);

//   let errors = req.validationErrors();

//   if (errors) {
//     res.render("add_doctor", {
//       errors: errors
//     });
//   } else {
//     let newUser = new User({
//       number: number,
//       ssn: ssn,
//       first_name: first_name,
//       middle_name: middle_name,
//       last_name: last_name,
//       email: email,
//       gender: gender,
//       salary: salary,
//       phone_number: phone_number,
//       password: password,
//       patients: patients
//     });

//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) {
//           console.log(err);
//         }
//         newUser.password = hash;
//         newUser.save(err => {
//           if (err) {
//             console.log(err);
//             return;
//           } else {
//             req.flash("success", "Doctor added successfuly!");
//             res.redirect("/doctors");
//           }
//         });
//       });
//     });
//   }
// });

// // Delete Doctor

// // Update Doctor

// // Return Doctors

// module.exports = router;

const { Eng, validateEng } = require("../models/eng.js");
const { Manger, validateManger } = require("../models/manger.js");
const { Equipment, validateEquipment } = require("../models/equipment");
const { Nurse, validateNurse } = require("../models/nurse");
const { Doctor, validateDoctor } = require("../models/doctor");
const { Room, validateRoom } = require("../models/room");
const { Patient, validatePatient } = require("../models/patient");
const { Medicine, validateMedicine } = require("../models/medicine");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

router.post("/add_doctor", (req, res, next) => {
  const number = req.body.number;
  const ssn = req.body.ssn;
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const gender = req.body.gender;
  const salary = req.body.salary;
  const phone_number = req.body.phone_number;
  const password = req.body.password;
  const password2 = req.body.password;
  const patients = req.body.patients;
  Doctor.find({ email: req.body.email })
    .exec()
    .then(doctor => {
      if (doctor.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const doctor = new Doctor({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            doctor
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Doctor created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

// router.delete("/:userId", (req, res, next) => {
//   User.remove({ _id: req.params.userId })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "User deleted"
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

module.exports = router;
