import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTokenDto {
  @ApiProperty({ description: 'refresh_token', nullable: false })
  @IsString()
  refresh_token: string;
}
