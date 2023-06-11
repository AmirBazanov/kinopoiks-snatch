// eslint-disable-next-line @typescript-eslint/no-namespace
import { IsNumber, IsString } from 'class-validator';

export namespace CreateCommentOnCommentContract {
  export class Request {
    @IsNumber()
    comment_id: number;
    @IsString()
    user_id: string;
    @IsString()
    title: string;
    @IsString()
    content: string;
    @IsString()
    type: string;
    @IsNumber()
    film_id: number;
  }

  export class Response {}
}
