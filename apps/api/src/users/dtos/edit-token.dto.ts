import { ApiProperty } from '@nestjs/swagger';

export class EditTokenDto {
  @ApiProperty({ description: 'refresh_token', nullable: false })
  token: string;
}
