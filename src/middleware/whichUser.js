const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtKey = process.env.jwtKey;

const isStudent = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please provide valid tokens" });
      } else {
        if (valid.user.role === 1) {
          res.locals.user = valid.user;
          next();
        } else {
          res.status(401).send({ result: "You are not authorized" });
        }
      }
    });
  } else {
    res.status(401).send({ result: "please add tokens with headers" });
  }
};

const isDean = async (req, res, next) => {
    let token = req.headers["authorization"];
  
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, jwtKey, (err, valid) => {
        if (err) {
          res.status(401).send({ result: "please provide valid tokens" });
        } else {
          if (valid.user.role === 2) {
            res.locals.user = valid.user;
            next();
          } else {
            res.status(401).send({ result: "You are not authorized" });
          }
        }
      });
    } else {
      res.status(401).send({ result: "please add tokens with headers" });
    }
  };

module.exports = {isStudent,isDean};