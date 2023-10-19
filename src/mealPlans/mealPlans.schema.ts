import mongoose, { Schema, models } from "mongoose";

export const MealPlanSchema = new Schema({
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
    // YYYY-MM-DD
    type: String,
    required: true,
  },
});

const MealPlan = models?.MealPlan || mongoose.model("MealPlan", MealPlanSchema);

export default MealPlan;
