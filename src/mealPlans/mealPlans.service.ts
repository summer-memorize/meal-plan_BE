import { Request, Response, NextFunction } from "express";
import MealPlan from "./mealPlans.schema";
import { CustomError } from "../utils/customError";

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

  public createMealPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 이미 존재하는 날짜인지 확인
      const isExist = await MealPlan.find({ date: req.body.date });
      if (isExist.length > 0) throw new CustomError("CONFLICT");

      const mealPlan = new MealPlan(req.body);
      await mealPlan.save();

      res.status(201).send("created");
    } catch (err) {
      next(err);
    }
  };

  public updateMealPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mealPlan = req.body;
      const updatedMealPlan = await MealPlan.findOneAndUpdate({ date: mealPlan.date }, mealPlan, { new: false });

      if (!updatedMealPlan) throw new CustomError("NOT_FOUND");

      res.status(200).send("ok");
    } catch (err) {
      next(err);
    }
  };

  public deleteMealPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date } = req.body;
      const deletedMealPlan = await MealPlan.findOneAndDelete({ date });

      if (!deletedMealPlan) throw new CustomError("NOT_FOUND");

      res.status(200).send("ok");
    } catch (err) {
      next(err);
    }
  };
}
