// eslint-disable-next-line @typescript-eslint/no-namespace
import { IsNumber, IsString } from 'class-validator';

export namespace CreateCommentContract {
  export class Request {
    @IsString()
    user_id: string;
    @IsString()
    private readonly title: string;
    @IsString()
    private readonly content: string;
    @IsString()
    private readonly type;
    @IsNumber()
    private readonly film_id: number;
  }

  export class Response {}
}
