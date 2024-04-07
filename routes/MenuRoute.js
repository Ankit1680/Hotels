const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log("menu item save success...");
    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Menu creation eror" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("menu fetch success...");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Menu fetch eror" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;

    const response = await MenuItem.find({ taste: tasteType });
    console.log("item fetch success...");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Menu fetch eror" });
  }
});

module.exports = router;
