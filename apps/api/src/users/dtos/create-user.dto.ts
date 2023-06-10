import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;
  @ApiProperty({ description: 'User password', nullable: false })
  password: string;
  @ApiProperty({ description: 'User name', nullable: false })
  user_name: string;
  @ApiProperty({ description: 'User community', nullable: true })
  community: string;
  @ApiProperty({ description: 'User birthday', nullable: true })
  birthday: string;
  @ApiProperty({ description: 'User gender', nullable: true })
  gender: boolean;
  @ApiProperty({ description: 'Profile quote', nullable: true })
  quote: string;
}
