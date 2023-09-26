const User = require("../models/Users");
const Slot = require("../models/Slots");

const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ bookedBy: null })
      .select("-bookedBy")
      .populate("deanId", "-password -role -__v");
    if (slots) {
      return res.status(200).json(slots);
    } else {
      return res.json("No free slots available");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const bookSlot = async (req, res) => {
  try {
    const user = res.locals.user;
    const id = res.params.id;
    const existingSlot = await Slot.findById(id);
    if (!existingSlot) {
      return res.status(400).json("slots not found");
    }
    if (existingSlot.bookedBy !== null) {
      return res.status(500).json("slots are booked");
    }
    const booking = await Slot.findByIdAndUpdate();
    return res.status(200).json(booking);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports ={bookSlot,getSlots};