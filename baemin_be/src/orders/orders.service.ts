import { Injectable } from '@nestjs/common';
import { ordersType } from './orders.controller';
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  async order(createOrdersDto: ordersType) {
    try {
      const foodDetails = await prisma.restaurant_food.findUnique({
        where: {
          id: createOrdersDto.restaurant_food_id,
          restaurant_id: createOrdersDto.restaurant_id,
        },
        select: {
          food_name: true,
          price: true,
        },
      });

      if (!foodDetails) {
        throw new Error('Invalid food item or restaurant');
        return 'Invalid food item or restaurant';
      }

      // Fetch restaurant details from the restaurant table
      const restaurantDetails = await prisma.restaurant.findUnique({
        where: {
          id: createOrdersDto.restaurant_id,
        },
        select: {
          restaurant_name: true,
        },
      });

      if (!restaurantDetails) {
        throw new Error('Restaurant not found');
      }

      const price = Number(foodDetails.price);
      const quantity = Number(createOrdersDto.quantity);

      const createOrder = await prisma.orders.create({
        data: {
          user_id: createOrdersDto.user_id,
          restaurant_food_id: createOrdersDto.restaurant_food_id,
          restaurant_id: createOrdersDto.restaurant_id,
          food_name: foodDetails.food_name,
          restaurant_name: restaurantDetails.restaurant_name,
          price: price,
          quantity: quantity,
          total: price * quantity,
        },
      });

      return createOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
}
