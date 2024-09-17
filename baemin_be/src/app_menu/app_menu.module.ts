import { Module } from '@nestjs/common';
import { AppMenuService } from './app_menu.service';
import { AppMenuController } from './app_menu.controller';

@Module({
  controllers: [AppMenuController],
  providers: [AppMenuService],
})
export class AppMenuModule {}
