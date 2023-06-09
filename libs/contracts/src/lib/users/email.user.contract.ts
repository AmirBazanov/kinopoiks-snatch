import { IsEmail } from 'class-validator';

export namespace EmailUserContract {
  export class Request {
    @IsEmail()
    email: string;
  }

  export class Response {
    user_id: number;
    email: string;
    is_admin: boolean;
    password: string;
    external_service_id: string;
  }
}
