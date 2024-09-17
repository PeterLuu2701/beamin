import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
    @ApiProperty()
    user_name: string;

    @ApiProperty()
    password: string;
}

export class LoginDto {
    @ApiProperty()
    user_name: string;

    @ApiProperty()
    password: string;
}