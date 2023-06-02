import { IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  film_id: string;

  @IsOptional()
  user_id: string;

  @IsOptional()
  comment_id: number;
  private readonly title: string;
  private readonly content: string;
  private readonly type: string;
}
