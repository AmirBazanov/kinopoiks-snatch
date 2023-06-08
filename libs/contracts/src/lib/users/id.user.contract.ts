// eslint-disable-next-line @typescript-eslint/no-namespace
import { IsNumber } from 'class-validator';

export namespace IdUserContract {
  export class Request {
    @IsNumber()
    user_id: number;
  }

  export class Response {
    user_id: number;
    email: string;
    is_admin: boolean;
    password: string;
    external_service_id: string;
  }
}
