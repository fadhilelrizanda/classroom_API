const express = require("express");
const router = express.Router();
const { socketModel } = require("../model/model");

// Post Method
router.post("/post", async (req, res) => {
  const data = new socketModel({
    s1: req.body.s1,
    s2: req.body.s2,
    s3: req.body.s3,
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
    const data = await socketModel.find().sort({ _id: -1 }).limit(limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await socketModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await socketModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await socketModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await socketModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete All Method
router.delete("/deleteAll", async (req, res) => {
  try {
    const result = await socketModel.deleteMany({});
    res.send(`${result.deletedCount} documents have been deleted.`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
