import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppMenuService } from './app_menu.service';
import { CreateAppMenuDto } from './dto/create-app_menu.dto';
import { UpdateAppMenuDto } from './dto/update-app_menu.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app_menu')
@Controller('app-menu')
export class AppMenuController {
  constructor(private readonly appMenuService: AppMenuService) {}

  @Post()
  create(@Body() createAppMenuDto: CreateAppMenuDto) {
    return this.appMenuService.create(createAppMenuDto);
  }

  @Get('get-all-app-menu')
  findAll() {
    return this.appMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppMenuDto: UpdateAppMenuDto) {
    return this.appMenuService.update(+id, updateAppMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appMenuService.remove(+id);
  }
}
