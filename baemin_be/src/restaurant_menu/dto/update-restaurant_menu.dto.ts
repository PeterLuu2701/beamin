import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantMenuDto } from './create-restaurant_menu.dto';

export class UpdateRestaurantMenuDto extends PartialType(CreateRestaurantMenuDto) {}
