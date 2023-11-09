import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealplanModule } from './mealplan/mealplan.module';

@Module({
  imports: [MealplanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
