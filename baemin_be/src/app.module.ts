import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppMenuModule } from './app_menu/app_menu.module';
import { FoodCardModule } from './food_card/food_card.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RestaurantFoodModule } from './restaurant_food/restaurant_food.module';
import { RestaurantMenuModule } from './restaurant_menu/restaurant_menu.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), UsersModule, AppMenuModule, FoodCardModule, AuthModule, RestaurantModule, RestaurantFoodModule, RestaurantMenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
