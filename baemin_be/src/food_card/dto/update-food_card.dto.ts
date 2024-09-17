import { PartialType } from '@nestjs/swagger';
import { CreateFoodCardDto } from './create-food_card.dto';

export class UpdateFoodCardDto extends PartialType(CreateFoodCardDto) {}
