import { Router } from "express";
import { MealPlanService } from "./mealPlans.service";

const router = Router();
const mealPlanService = new MealPlanService();

// [GET] /mealplans?year=2023
router.get("/", mealPlanService.getMealPlans);
router.post("/", mealPlanService.createMealPlan);
router.put("/", mealPlanService.updateMealPlan);
router.delete("/", mealPlanService.deleteMealPlan);

export default router;
