const express = require("express");
const router = express.Router();
//step 4: create models folder and import models in server.js
const Person = require("../models/Person");

// post method to send data
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved success");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server eeror" });
  }
});

//GET method to access data
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched success");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server eeror" });
  }
});

// parameterized API
router.get("/:workType", async (req, res) => {
  try {
    //fetch the param from req.params
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("person fetch success...");
      res.status(200).json(response);
    } else {
      res.status(404).json({ err: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server eeror" });
  }
});


//UPDATE method   >> update method on the base of _id 
router.put("/:id", async (req, res) => {
  try {
    //id sent by user
    const personId = req.params.id;
    // updated data sent by user
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      res.status(404).json({ msg: "person not found" });
    }

    console.log("data update success.....");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server eeror" });
  }
});


//DELETE method >>  delete method on the base of _id 
router.delete("/:id", async (req, res)=>{
    try {
      const personId = req.params.id;

      const response = await Person.findByIdAndDelete(personId)
      if(!response) {
        res.status(404).json({msg: 'person not found'});
      }

      console.log("user deleted success.....");
      res.status(200).json({response, msg:'Person deleted successfully'});
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server eeror" });
    }
})

module.exports = router;
