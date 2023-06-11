import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty({ description: 'user ID', nullable: false })
  user_id: string;
  @ApiProperty({ description: 'user name', nullable: true })
  user_name?: string;
  @ApiProperty({ description: 'user birthday', nullable: true })
  birthday?: string;
  @ApiProperty({ description: 'user gender', nullable: true })
  gender?: boolean;
  @ApiProperty({ description: 'profile quote', nullable: true })
  quote?: string;
}
