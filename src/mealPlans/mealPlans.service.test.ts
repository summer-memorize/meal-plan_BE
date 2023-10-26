jest.mock("./mealPlans.schema");
import { Request, Response, NextFunction } from "express";
import { Validator } from "../utils/validator";
import { MealPlanService } from "./mealPlans.service";
import MealPlan from "./mealPlans.schema";
import { CustomError } from "../utils/customError";

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

    it("get 요청 valid query가 오면 정상적으로 MealPlans를 찾아오고 status 200 반환", async () => {
      const req = { query: { year: "2023" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      ((await MealPlan.find) as jest.Mock).mockReturnValue([
        {
          date: "2023-01-01",
          breakfast: ["Eggs"],
          lunch: ["Salad"],
          dinner: ["Chicken"],
        },
        {
          date: "2023-01-02",
          breakfast: ["Eggs"],
          lunch: ["Salad"],
          dinner: ["Chicken"],
        },
      ]);

      await mealPlanService.getMealPlans(req, res, next);

      expect(res.status).toBeCalledWith(200);
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

    it("post 요청 valid body가 오면 정상적으로 MealPlan을 생성하고 status 201 반환", async () => {
      const req = {
        body: { date: "2023-01-01", breakfast: ["Eggs"], lunch: ["Salad"], dinner: ["Chicken"] },
      } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      ((await MealPlan.find) as jest.Mock).mockReturnValue([]);

      await mealPlanService.createMealPlan(req, res, next);

      expect(res.status).toBeCalledWith(201);
    });

    it("post 요청 시 이미 존재하는 날짜면 CONFLICT CustomError 발생", async () => {
      const req = {
        body: { date: "2023-01-01", breakfast: ["Eggs"], lunch: ["Salad"], dinner: ["Chicken"] },
      } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      ((await MealPlan.find) as jest.Mock).mockReturnValue([
        {
          date: "2023-01-01",
          breakfast: ["Eggs"],
          lunch: ["Salad"],
          dinner: ["Chicken"],
        },
      ]);

      await mealPlanService.createMealPlan(req, res, next);

      expect(next).toBeCalledWith(new CustomError("CONFLICT"));
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

    it("put 요청 valid body가 오면 정상적으로 MealPlan을 수정하고 status 200 반환", async () => {
      const req = {
        body: { date: "2023-01-01", breakfast: [], lunch: ["Salad"], dinner: ["Chicken"] },
      } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      ((await MealPlan.findOneAndUpdate) as jest.Mock).mockReturnValue({
        date: "2023-01-01",
        breakfast: ["Eggs"],
        lunch: ["Salad"],
        dinner: ["Chicken"],
      });

      await mealPlanService.updateMealPlan(req, res, next);

      expect(res.status).toBeCalledWith(200);
    });

    it("put 요청 시 존재하지 않는 날짜면 NOT_FOUND CustomError 발생", async () => {
      const req = {
        body: { date: "2023-01-01", breakfast: [], lunch: ["Salad"], dinner: ["Chicken"] },
      } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      ((await MealPlan.findOneAndUpdate) as jest.Mock).mockReturnValue(null);

      await mealPlanService.updateMealPlan(req, res, next);

      expect(next).toBeCalledWith(new CustomError("NOT_FOUND"));
    });
  });

  describe("deleteMealPlan", () => {
    it("delete 요청 valid query", async () => {
      const req = { query: { date: "2023-10-23" } } as unknown as Request;

      const result = await validator.dateSchema.validateAsync(req.query);

      expect(result.error).toBeFalsy();
    });

    it("delete 요청 valid query가 오면 정상적으로 MealPlan을 삭제하고 status 200 반환", async () => {
      const req = { query: { date: "2023-10-23" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      ((await MealPlan.findOneAndDelete) as jest.Mock).mockReturnValue({
        date: "2023-01-01",
        breakfast: ["Eggs"],
        lunch: ["Salad"],
        dinner: ["Chicken"],
      });

      await mealPlanService.deleteMealPlan(req, res, next);

      expect(res.status).toBeCalledWith(200);
    });

    it("delete 요청 시 존재하지 않는 날짜면 NOT_FOUND CustomError 발생", async () => {
      const req = { query: { date: "2023-10-23" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      ((await MealPlan.findOneAndDelete) as jest.Mock).mockReturnValue(null);

      await mealPlanService.deleteMealPlan(req, res, next);

      expect(next).toBeCalledWith(new CustomError("NOT_FOUND"));
    });
  });
});
