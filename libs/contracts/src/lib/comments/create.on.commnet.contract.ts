// eslint-disable-next-line @typescript-eslint/no-namespace
import { IsNumber, IsString } from 'class-validator';

export namespace CreateCommentOnCommentContract {
  export class Request {
    @IsNumber()
    comment_id: number;
    @IsString()
    user_id: string;
    @IsString()
    private readonly title: string;
    @IsString()
    private readonly content: string;
    @IsString()
    private readonly type: string;
    @IsNumber()
    private readonly film_id: number;
  }

  export class Response {}
}
