const express = require("express");

const router = express.Router();
const { dataModel, acStatModel } = require("../model/model");

module.exports = router;

//Post Method
router.post("/post", async (req, res) => {
  const data = new acStatModel({
    condition: req.body.condition,
    temperature: req.body.temperature,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getLatest/:limit", async (req, res) => {
  try {
    // Extract the limit from URL parameters and parse it as an integer
    const limit = parseInt(req.params.limit, 10);

    // Ensure the limit is a positive integer
    if (isNaN(limit) || limit <= 0) {
      return res
        .status(400)
        .json({ message: "Limit must be a positive integer." });
    }

    // Retrieve the latest documents based on the limit
    const data = await acStatModel.find().sort({ _id: -1 }).limit(limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await acStatModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by ID Method
//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await acStatModel.findById(req.params.id);
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

    const result = await acStatModel.findByIdAndUpdate(
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
    const data = await acStatModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/deleteAll", async (req, res) => {
  try {
    const result = await acStatModel.deleteMany({});
    res.send(`${result.deletedCount} documents have been deleted.`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
