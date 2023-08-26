const routes = require("./routes/routes");
const roomstat = require("./routes/roomstat");
const classRoutes = require("./routes/class");
const acStatRoutes = require("./routes/acstat");
const relayStatRoutes = require("./routes/relaystat");
const socketRoutes = require("./routes/socketstat");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

const cors = require("cors");

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected!");
});
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use(express.json());
// const routes = require("./rout es/routes");
app.use("/roomstat", roomstat);
app.use("/acstat", acStatRoutes);
app.use("/api", routes);
app.use("/class", classRoutes);
app.use("/relaystat", relayStatRoutes);
app.use("/socketstat", socketRoutes);
app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});
