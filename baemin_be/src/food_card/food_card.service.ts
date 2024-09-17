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

  async findByKeyword(keyword: string) {
    try {
      const foodCardBySearch = await prisma.food_card.findMany({
        where: {
          food_name: {
            contains: keyword
          }
        }
      });
      return foodCardBySearch;
    } catch (error) {
      throw new Error('Failed to get job');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} foodCard`;
  }

  update(id: number, updateFoodCardDto: UpdateFoodCardDto) {
    return `This action updates a #${id} foodCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodCard`;
  }
}
