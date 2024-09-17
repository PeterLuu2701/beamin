import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('get-all-restaurant')
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get('get-restaurant-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }
}
