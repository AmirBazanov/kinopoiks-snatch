import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTokenDto {
  @ApiProperty({ description: 'refresh_token', nullable: false })
  @IsJWT()
  refresh_token: string;
}
