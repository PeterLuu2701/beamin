import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient

@Injectable()
export class RestaurantService {

  async findAll() {
    try {
      const allRestaurant = await prisma.restaurant.findMany(); 
      return allRestaurant;
    } catch (error) {
      throw new Error('Failed to retrieve restaurants');
    }
  }

  async findOne(id: number) {
    try {
      const restaurant = await prisma.restaurant.findFirst({
        where: {
          id: id
        }
      }); 
      return restaurant;
    } catch (error) {
      throw new Error('Failed to retrieve restaurant');
    }
  }
}
