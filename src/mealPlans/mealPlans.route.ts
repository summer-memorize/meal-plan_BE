import { Router } from "express";
import { MealPlanService } from "./mealPlans.service";

const router = Router();
const mealPlanService = new MealPlanService();

// [GET] /mealplans?year=2023
router.get("/", mealPlanService.getMealPlans);

export default router;
