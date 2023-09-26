const express = require("express");

//importing controllers

const { addUser, login } = require("../controllers/user-controller.js");
const { isStudent,isDean } = require("../middleware/whichUser.js");
const {
  addSlot,
  pendingSession,
} = require("../controllers/dean-controller.js");
const { getSlots, bookSlot } = require("../controllers/student-controller.js");

const route = express.Router();

route.post("/addUser",addUser);
route.post("/login", login);
route.post("/addSlot", isDean, addSlot);
route.get("/freeSlots", isStudent, getSlots);
route.patch("/bookSlot/:id", isStudent, bookSlot);
route.get("/getPendingSessions", isDean, pendingSession);

module.exports = route;
