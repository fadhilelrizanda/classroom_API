const mongoose = require("mongoose");

const peopleDetectSchema = new mongoose.Schema(
  {
    total: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const acStatSchema = new mongoose.Schema(
  {
    condition: {
      required: true,
      type: Number,
    },
    temperature: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const roomStatSchema = new mongoose.Schema(
  {
    temp: {
      required: true,
      type: Number,
    },
    humid: {
      required: true,
      type: Number,
    },
    current: {
      required: true,
      type: Number,
    },
    power: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const relayStatSchema = new mongoose.Schema(
  {
    fan: {
      required: true,
      type: Number,
    },
    lamp: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const peopleDetectModel = mongoose.model("PeopleDetect", peopleDetectSchema);
const roomstatModel = mongoose.model("roomStat", roomStatSchema);
const acStatModel = mongoose.model("acStat", acStatSchema);
const relayStatModel = mongoose.model("relayStat", relayStatSchema);

module.exports = {
  peopleDetectModel,
  roomstatModel,
  acStatModel,
  relayStatModel,
};
