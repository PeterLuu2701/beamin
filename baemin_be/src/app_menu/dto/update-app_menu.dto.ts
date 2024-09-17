import { PartialType } from '@nestjs/swagger';
import { CreateAppMenuDto } from './create-app_menu.dto';

export class UpdateAppMenuDto extends PartialType(CreateAppMenuDto) {}
