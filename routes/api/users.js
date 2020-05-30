const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../../validation/register");
const validateConfirmInput = require("../../validation/confirm");
const User = require("../../models/User");
const { sendConfirmation } = require("../../utils/sendConfirmation");

// @route GET api/users/test
// @desc Tests users route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route GET api/users/register
// @desc register user
// @access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      if (user.confirmed) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        sendConfirmation(user._id, user.email);
      }
    } else {
      const newUser = new User({
        email: req.body.email,
        confirmed: false,
      });

      newUser
        .save()
        .then(async (user) => {
          // SEND EMAIL
          sendConfirmation(user._id, user.email);
          return res.json(user);
        })
        .catch((err) => console.log(err));
    }
  });
});

// @route GET api/users/confirm
// @desc confirm user email address
// @access public
router.post("/confirm", (req, res) => {
  const { errors, isValid } = validateConfirmInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ _id: req.body._id }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    if (user.confirmed) {
      throw new Error("user alredy confirmed");
    } else {
      const date = new Date();
      User.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            confirmed: true,
            confirmDate: date,
            unsubscribed: false,
          },
        },
        { new: true }
      )
        .then((confirmation) => {
          res.json(confirmation);
        })
        .catch((err) => res.status(400).json({ msg: "confirmation failed" }));
    }
  });
});

// @route GET api/users/unsubscribe
// @desc unsubscribe user email address
// @access public
router.post("/unsubscribe", (req, res) => {
  const { errors, isValid } = validateConfirmInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ _id: req.body._id }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    const date = new Date();
    User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          unsubscribed: true,
          unsubscribeDate: date,
          confirmed: false,
        },
      },
      { new: true }
    )
      .then((confirmation) => {
        res.json(confirmation);
      })
      .catch((err) => res.status(400).json({ msg: "unsubscribe failed" }));
  });
});

module.exports = router;
