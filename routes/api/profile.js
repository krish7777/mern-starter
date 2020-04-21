const express = require("express");
const router = express.Router();

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middlewares/auth");

//Find a Profile by id
router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["name", "email"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.status(200).json({ profile });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

//Get all profiles
//Pagination--TODO
router.get("/all", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Search profile--TODO

//View MY profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "email"]);
    res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Update MY Profile--TODO

//Delete MY profile
router.delete("/me", auth, async (req, res) => {
  try {
    //TODO- remove anything associated with the user
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.status(200).json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
