import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class ordersType {
  @ApiProperty()
  user_id: number

  @ApiProperty()
  restaurant_food_id: number

  @ApiProperty()
  restaurant_id: number

  @ApiProperty()
  quantity: number

  @ApiProperty()
  total: Decimal
}

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create-order')
  order(@Body() createOrdersDto: ordersType) {
    return this.ordersService.order(createOrdersDto);
  }

  @Put('update_delivery/:orderId')
  updateDelivery(@Param('orderId') orderId: string) {
    return this.ordersService.updateDelivery(orderId);
  }
}
