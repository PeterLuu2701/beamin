import { Injectable } from '@nestjs/common';
import { CreateRestaurantMenuDto } from './dto/create-restaurant_menu.dto';
import { UpdateRestaurantMenuDto } from './dto/update-restaurant_menu.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient

@Injectable()
export class RestaurantMenuService {

  async findAll() {
    try {
      const allRestaurantMenu = await prisma.restaurant_menu.findMany(); 
      return allRestaurantMenu;
    } catch (error) {
      throw new Error('Failed to retrieve restaurant menu');
    }
  }
}
