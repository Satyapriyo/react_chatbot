const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("./database/db");
const route = require("./routes/route");

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);

const PORT = 8000;

Connection();

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT} 🚀🚀🚀`);
});
