const express = require("express");
const router = express.Router();

const MealPlan = require("./mealPlan");

router.use("/mealplan", MealPlan);
router.get("/ping", async (req, res) => {
  res.status(200).send("pong");
});

module.exports = router;
