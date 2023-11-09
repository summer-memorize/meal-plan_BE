import { Controller } from '@nestjs/common';
import { MealplanService } from './mealplan.service';

@Controller('mealplan')
export class MealplanController {
  constructor(private readonly mealplanService: MealplanService) {}
}
