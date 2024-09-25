import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class ordersType {
  @ApiProperty()
  user_id: number

  @ApiProperty()
  restaurant_food_id: number

  @ApiProperty()
  restaurant_id: number

  @ApiProperty()
  food_name: string

  @ApiProperty()
  restaurant_name: string

  @ApiProperty()
  price: number

  @ApiProperty()
  quantity: number

  @ApiProperty()
  total: number
}

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create-order')
  order(@Body() createOrdersDto: ordersType) {
    return this.ordersService.order(createOrdersDto);
  }
}
