import Joi, { string } from "joi";

export class Validator {
  public date = Joi.string().pattern(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")).required().description("YYYY-MM-DD");

  yearSchema: Joi.ObjectSchema = Joi.object({
    year: Joi.string().pattern(new RegExp("^[0-9]{4}$")).required().description("YYYY"),
  });

  mealPlanSchema: Joi.ObjectSchema = Joi.object({
    breakfast: Joi.array().items(Joi.string().max(256)).required().description("아침 식단"),
    lunch: Joi.array().items(Joi.string().max(256)).required().description("점심 식단"),
    dinner: Joi.array().items(Joi.string().max(256)).required().description("저녁 식단"),
    date: this.date,
  });

  dateSchema: Joi.ObjectSchema = Joi.object({
    date: this.date,
  });
}
