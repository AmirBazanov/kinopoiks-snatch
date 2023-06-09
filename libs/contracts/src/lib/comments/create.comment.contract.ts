// eslint-disable-next-line @typescript-eslint/no-namespace
import { IsNumber, IsString } from 'class-validator';

export namespace CreateCommentContract {
  export class Request {
    @IsString()
    user_id: string;
    @IsString()
    title: string;
    @IsString()
    content: string;
    @IsString()
    type;
    @IsNumber()
    film_id: number;
  }

  export class Response {}
}
