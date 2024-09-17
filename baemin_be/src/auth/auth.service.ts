import { Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient, users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
  ) { }

  async signUp(createAuthDto: CreateAuthDto) {
    try {
      const createUser = await prisma.users.create({
        data: {
          user_name: createAuthDto.user_name,
          password: createAuthDto.password,
        }
      });
      return createUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { user_name, password } = loginDto;

    const user: users | null = await prisma.users.findFirst({
      where: { user_name },
    });

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id, userName: user.user_name }, { expiresIn: "5m", secret: "SECRET_KEY" });

    return token;
  }
}
