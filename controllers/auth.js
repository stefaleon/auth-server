const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const private = require("../private/private");

const SECRET = private.jwtSecret;

exports.postSignUp = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Email and Password are required" });
  }

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).send({ error: "Email is in use" });
      } else {
        bcrypt
          .genSalt(10)
          .then(salt => {
            bcrypt
              .hash(password, salt)
              .then(hashedPassword => {
                const user = new User({
                  email,
                  password: hashedPassword
                });

                return user
                  .save()
                  .then(savedUser => {
                    const token = jwt.sign({ userId: savedUser._id }, SECRET, {
                      expiresIn: "1h"
                    });
                    res.json(token);
                  })
                  .catch(err => next(err));
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
};

exports.postLogIn = (req, res, next) => {};
