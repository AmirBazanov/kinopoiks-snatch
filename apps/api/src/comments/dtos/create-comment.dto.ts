import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Film ID', nullable: false })
  film_id: string;

  @ApiProperty({ description: 'User ID', nullable: false })
  user_id: string;

  @ApiProperty({ description: 'Comment ID', nullable: true })
  @IsOptional()
  comment_id: number;

  @ApiProperty({ description: 'Comment title', nullable: false })
  title: string;

  @ApiProperty({ description: 'Comment content', nullable: false })
  content: string;

  @ApiProperty({ description: 'Comment type', nullable: false })
  type: string;
}
