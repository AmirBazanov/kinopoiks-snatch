// eslint-disable-next-line @typescript-eslint/no-namespace
import { IsNumber, IsString } from 'class-validator';

export namespace CreateCommentContract {
  export class Request {
    @IsString()
    private readonly title: string;

    @IsString()
    private readonly content: string;

    @IsNumber()
    private readonly film_id: number;

    @IsNumber()
    private readonly user_id: number;
  }

  export class Response {}
}
