import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantFoodDto } from './create-restaurant_food.dto';

export class UpdateRestaurantFoodDto extends PartialType(CreateRestaurantFoodDto) {}
