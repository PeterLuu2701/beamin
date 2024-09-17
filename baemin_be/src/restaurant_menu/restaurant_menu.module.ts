import { Module } from '@nestjs/common';
import { RestaurantMenuService } from './restaurant_menu.service';
import { RestaurantMenuController } from './restaurant_menu.controller';

@Module({
  controllers: [RestaurantMenuController],
  providers: [RestaurantMenuService],
})
export class RestaurantMenuModule {}
