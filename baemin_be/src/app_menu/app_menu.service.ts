import { Injectable } from '@nestjs/common';
import { CreateAppMenuDto } from './dto/create-app_menu.dto';
import { UpdateAppMenuDto } from './dto/update-app_menu.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient

@Injectable()
export class AppMenuService {
  create(createAppMenuDto: CreateAppMenuDto) {
    return 'This action adds a new appMenu';
  }

  async findAll() {
    try {
      const allAppMenuItems = await prisma.app_menu.findMany();
      return allAppMenuItems;
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} appMenu`;
  }

  update(id: number, updateAppMenuDto: UpdateAppMenuDto) {
    return `This action updates a #${id} appMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} appMenu`;
  }
}
