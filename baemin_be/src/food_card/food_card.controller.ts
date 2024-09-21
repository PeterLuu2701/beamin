import {
  Controller,
  Get,
  Post,
  Body,
  Query
} from '@nestjs/common';
import { FoodCardService } from './food_card.service';
import { CreateFoodCardDto } from './dto/create-food_card.dto';
import { UpdateFoodCardDto } from './dto/update-food_card.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('food_card')
@Controller('food-card')
export class FoodCardController {
  constructor(private readonly foodCardService: FoodCardService) {}

  @Post()
  create(@Body() createFoodCardDto: CreateFoodCardDto) {
    return this.foodCardService.create(createFoodCardDto);
  }

  @Get('get-all-food-card')
  findAll() {
    return this.foodCardService.findAll();
  }

  @Get('get-food-card-by-search')
findByKeyword(@Query('keyword') keyword: string, @Query('page') page: number) {
  return this.foodCardService.findByKeyword(keyword, page);
}
}
