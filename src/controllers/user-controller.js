const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtKey = process.env.jwtKey;

const addUser = async (req, res) => {
  try {
    let exist = await User.findOne({ userId: req.body.userId });
    if (exist) {
      res.status(200).json({ msg: "the user is already created" });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      userId: req.body.userId,
      name: req.body.name,
      password: hashedPassword,
      role: req.body.role,
    };
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ userId: req.body.userId });
    if (!user) {
      return res.status(400).json({ msg: "Student is not in record" });
    }
    const match = await bcrypt.hash(req.body.password, user.password);
    if (match) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          return res.status(500).json({ msg: "Jwt has some problem" });
        }
        res.status(200).json({ user, auth: token });
      });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = { addUser, login };
