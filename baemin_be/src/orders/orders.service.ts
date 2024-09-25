import { Injectable } from '@nestjs/common';
import { ordersType } from './orders.controller';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient

@Injectable()
export class OrdersService {
  async order(createOrdersDto: ordersType) {
    try {
      const createOrder = await prisma.orders.create({
        data: {
            user_id: createOrdersDto.user_id,
            restaurant_food_id: createOrdersDto.restaurant_food_id,
            restaurant_id: createOrdersDto.restaurant_id,
            food_name: createOrdersDto.food_name,
            restaurant_name: createOrdersDto.restaurant_name,
            price: createOrdersDto.price,
            quantity: createOrdersDto.quantity,
            total: createOrdersDto.price * createOrdersDto.quantity
        },
      });
      return createOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
}
