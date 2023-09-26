const Slot = require("../models/Slots");

const addSlot = async (req, res) => {
  try {
    const slotData = req.body;
    const newSlot = new Slot(slotData);
    await newSlot.save();
    return res.status(200).json(newSlot);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

const pendingSession = async (req, res) => {
  try {
    const dean = res.locals.user;
    const id = dean._id;
    const slots = await Slot.find(
      { deanId: id, bookedBy: { $ne: null } }.populate("bookedby")
    );
    const today = new Date();
    const pendingSlots = [];

    slots.map((slot) => {
      var date = slot.date;
      var time = slot.time;
      var slotData = new Data(data + " " + time);
      if (today < slotData) {
        pendingSlots.push({
          day: slot.day,
          data: slot.data,
          time: slot.time,
          bookedBy: slot.bookedBy.name,
        });
      }
    });
    return res.status(200).json(pendingSlots);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

module.exports = { addSlot, pendingSession };
