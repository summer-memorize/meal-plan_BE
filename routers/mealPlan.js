const express = require("express");
const router = express.Router();

const wrapAsyncMiddleware = require("../middlewares/wrapAsyncMiddleware");

// [GET] /mealplans?year=2023
// router.get("/", wrapAsyncMiddleware(mealPlanController.getMealPlans));

module.exports = router;
