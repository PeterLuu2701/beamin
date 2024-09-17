import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantMenuService } from './restaurant_menu.service';
import { CreateRestaurantMenuDto } from './dto/create-restaurant_menu.dto';
import { UpdateRestaurantMenuDto } from './dto/update-restaurant_menu.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('restaurant_menu')
@Controller('restaurant-menu')
export class RestaurantMenuController {
  constructor(private readonly restaurantMenuService: RestaurantMenuService) {}

  @Get('get-all-restaurant-menu')
  findAll() {
    return this.restaurantMenuService.findAll();
  }

  
}
