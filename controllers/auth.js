const User = require("../models/user");

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
        const user = new User({
          email,
          password
        });
        user.save().then(savedUser => res.json(savedUser));
      }
    })
    .catch(err => next(err));
};

exports.postLogIn = (req, res, next) => {};
