import { Request, Response, NextFunction } from "express";
import { Validator } from "../utils/validator";
import { MealPlanService } from "./mealPlans.service";

describe("MealPlanService", () => {
  let mealPlanService: MealPlanService;
  let validator: Validator;

  beforeAll(() => {
    mealPlanService = new MealPlanService();
    validator = new Validator();
  });

  describe("getMealPlans", () => {
    it("get 요청 valid query", async () => {
      const req = { query: { year: "2023" } } as unknown as Request;

      const result = await validator.yearSchema.validateAsync(req.query);

      expect(result.error).toBeFalsy();
    });
  });

  describe("createMealPlan", () => {
    it("post 요청 valid body", async () => {
      const req = {
        body: { date: "2023-01-01", breakfast: ["Eggs"], lunch: ["Salad"], dinner: ["Chicken"] },
      } as Request;

      const result = await validator.mealPlanSchema.validateAsync(req.body);

      expect(result.error).toBeFalsy();
    });
  });

  describe("updateMealPlan", () => {
    it("put 요청 valid body", async () => {
      const req = {
        body: { date: "2023-01-01", breakfast: [], lunch: ["Salad"], dinner: ["Chicken"] },
      } as Request;

      const result = await validator.mealPlanSchema.validateAsync(req.body);

      expect(result.error).toBeFalsy();
    });
  });

  describe("deleteMealPlan", () => {
    it("delete 요청 valid query", async () => {
      const req = { query: { date: "2023-10-23" } } as unknown as Request;

      const result = await validator.dateSchema.validateAsync(req.query);

      expect(result.error).toBeFalsy();
    });
  });
});
