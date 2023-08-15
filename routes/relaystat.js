const express = require("express");

const router = express.Router();
const { dataModel, relayStatModel } = require("../model/model");

module.exports = router;

//Post Method
router.post("/post", async (req, res) => {
  const data = new relayStatModel({
    fan: req.body.fan,
    lamp: req.body.lamp,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getLatest", async (req, res) => {
  try {
    const data = await relayStatModel.find().sort({ _id: -1 }).limit(1);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await relayStatModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by ID Method
//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await relayStatModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await relayStatModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await relayStatModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
