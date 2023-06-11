import { IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  film_id: string;

  @IsOptional()
  user_id: string;

  @IsOptional()
  comment_id: number;
  title: string;
  content: string;
  type: string;
}
