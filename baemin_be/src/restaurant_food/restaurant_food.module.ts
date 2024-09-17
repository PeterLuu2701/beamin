import { Module } from '@nestjs/common';
import { RestaurantFoodService } from './restaurant_food.service';
import { RestaurantFoodController } from './restaurant_food.controller';

@Module({
  controllers: [RestaurantFoodController],
  providers: [RestaurantFoodService],
})
export class RestaurantFoodModule {}
