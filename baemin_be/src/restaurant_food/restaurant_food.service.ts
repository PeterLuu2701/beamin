import { Injectable } from '@nestjs/common';
import { CreateRestaurantFoodDto } from './dto/create-restaurant_food.dto';
import { UpdateRestaurantFoodDto } from './dto/update-restaurant_food.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient

@Injectable()
export class RestaurantFoodService {

  async findAll() {
    try {
      const allRestaurantFood = await prisma.restaurant_food.findMany(); 
      return allRestaurantFood;
    } catch (error) {
      throw new Error('Failed to retrieve restaurants');
    }
  }

  async findFoodByRestaurantId(id: number) {
    try {
      const foodByRestaurantId = await prisma.restaurant_food.findMany({
        where: {
          restaurant_id: id
        }
      });
      return foodByRestaurantId;
    } catch (error) {
      throw new Error('Failed to get foods');
    }
  }
}
