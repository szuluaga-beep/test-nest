import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jhon Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'jhon@doe.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string;
}
