const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const username = process.env.username;
const password = process.env.password;

// mongoose
//   .connect(mongo_url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connection succes full");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const Connection = async () => {
  try {
    const URL = `mongodb+srv://satya:${password}@student01.1mbxzah.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(URL, { useUnifiedTopology: true });
    console.log("database connected succesfully ✅");
  } catch (err) {
    console.log("there is an error " + err);
  }
};

module.exports = Connection;
