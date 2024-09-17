import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodCardService } from './food_card.service';
import { CreateFoodCardDto } from './dto/create-food_card.dto';
import { UpdateFoodCardDto } from './dto/update-food_card.dto';
import { ApiTags } from '@nestjs/swagger';

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
  findByKeyword(@Body('keyword') body: {keyword: string}) {
    return this.foodCardService.findByKeyword(body.keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodCardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodCardDto: UpdateFoodCardDto,
  ) {
    return this.foodCardService.update(+id, updateFoodCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodCardService.remove(+id);
  }
}
