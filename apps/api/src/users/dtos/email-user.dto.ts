import { ApiProperty } from '@nestjs/swagger';

export class EmailUserDto {
  @ApiProperty({ description: 'user email', nullable: false })
  email: string;
}
