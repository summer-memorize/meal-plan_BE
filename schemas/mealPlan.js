const mongoose = require("mongoose");

const { Schema } = mongoose;
const mealPlanSchema = new Schema({
  breakfast: {
    type: Array,
    required: true,
  },
  lunch: {
    type: Array,
    required: true,
  },
  dinner: {
    type: Array,
    required: true,
  },
  date: {
    // yyyy-mm-dd
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MealPlan", mealPlanSchema);
