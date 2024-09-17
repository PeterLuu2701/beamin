import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantFoodService } from './restaurant_food.service';
import { CreateRestaurantFoodDto } from './dto/create-restaurant_food.dto';
import { UpdateRestaurantFoodDto } from './dto/update-restaurant_food.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('restaurant_food')
@Controller('restaurant-food')
export class RestaurantFoodController {
  constructor(private readonly restaurantFoodService: RestaurantFoodService) {}


  @Get('get-all-restaurant-food')
  findAll() {
    return this.restaurantFoodService.findAll();
  }

}
