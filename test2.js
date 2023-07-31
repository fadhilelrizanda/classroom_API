const routes = require("./routes/routes");
const chicken = require("./routes/chicken");
const express = require("express");
const mongoose = require("mongoose");
// const mongoString = process.env.DATABASE_URL;
const mongoString =
  "mongodb+srv://fadhilelrizandamicr:xU4xokwD6X2Xi6Gn@cluster0.h4v4j79.mongodb.net/";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use(express.json());
// const routes = require("./rout es/routes");
app.use("/chicken", chicken);
app.use("/api", routes);
app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});
