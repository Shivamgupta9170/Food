const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');
const jwtSecret = "hellodostoiamshivamguptahellodosto"

router.post("/createuser",
  body('email').isEmail(),
  body('password', 'minimum password length must be 6').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bycrpt.genSalt(10);
    let secPassword = await bycrpt.hash(req.body.password,salt);

    try {
      // Corrected the email assignment
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,  
        location: req.body.location,
        isChecked: req.body.isChecked
      });

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: error.message });
    }
  });

  router.post("/Login",
  body('email').isEmail(),
  body('password', 'minimum password length must be 6').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Try logging in with the correct email" });
      }

      const pwdCompare = await bycrpt.compare(req.body.password, userData.password); // await bcrypt.compare
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Try logging in with the correct password" });
      }

      const data = {
        user: {
          id: userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret);

      res.json({ success: true, authToken: authToken });
      console.log("Successfully logged in");
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message }); // Internal server error
    }
  });


module.exports = router;

