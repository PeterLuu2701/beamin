import { Module } from '@nestjs/common';
import { FoodCardService } from './food_card.service';
import { FoodCardController } from './food_card.controller';

@Module({
  controllers: [FoodCardController],
  providers: [FoodCardService],
})
export class FoodCardModule {}
