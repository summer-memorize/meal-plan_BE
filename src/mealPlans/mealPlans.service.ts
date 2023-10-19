import { Request, Response, NextFunction } from "express";
import MealPlan from "./mealPlans.schema";

export class MealPlanService {
  public getMealPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { year } = req.query;

      const mealPlans = await MealPlan.find({ date: { $regex: `${year}-[0-9]{2}-[0-9]{2}` } });
      res.status(200).json({ data: mealPlans });
    } catch (err) {
      next(err);
    }
  };
}
