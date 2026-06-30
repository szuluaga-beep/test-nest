import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'My awesome event',
  })
  @IsString()
  @MaxLength(200, {
    message: 'Name is too long',
  })
  name: string;
}
