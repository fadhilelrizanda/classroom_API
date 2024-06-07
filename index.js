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

// Configure CORS
const corsOptions = {
  origin: "https://smartclassroomweb.vercel.app", // Allow requests from this specific origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
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

// Preflight OPTIONS requests handling
app.options("*", cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
