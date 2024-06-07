const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/routes");
const roomstat = require("./routes/roomstat");
const classRoutes = require("./routes/class");
const acStatRoutes = require("./routes/acstat");
const relayStatRoutes = require("./routes/relaystat");
const socketRoutes = require("./routes/socketstat");

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.error("Database connection error:", error);
});

database.once("connected", () => {
  // console.log("Database Connected!");
});

const app = express();
// Add headers before the routes are defined
// Set middleware of CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://your-frontend.com");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use("/roomstat", roomstat);
app.use("/acstat", acStatRoutes);
app.use("/api", routes);
app.use("/class", classRoutes);
app.use("/relaystat", relayStatRoutes);
app.use("/socketstat", socketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
