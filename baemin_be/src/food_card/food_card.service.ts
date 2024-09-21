import { Injectable } from '@nestjs/common';
import { CreateFoodCardDto } from './dto/create-food_card.dto';
import { UpdateFoodCardDto } from './dto/update-food_card.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient

@Injectable()
export class FoodCardService {
  create(createFoodCardDto: CreateFoodCardDto) {
    return 'This action adds a new foodCard';
  }

  async findAll() {
    try {
      const allFoodCard = await prisma.food_card.findMany();
      return allFoodCard;
    } catch (error) {
      throw new Error('Failed to get all food card');
    }
  }

  async findByKeyword(keyword: any, page: number) {
    try {

      let index = (page - 1) * 5;

      const foodCardBySearch = await prisma.food_card.findMany({
        where: {
          food_name: {
            contains: keyword,
            mode: 'insensitive'
          }
        },
        skip: index,
        take: 5
      });

      console.log('Search result: ', foodCardBySearch);

      return foodCardBySearch;
    } catch (error) {
      throw new Error('Failed to get food cards');
    }
  }
}
