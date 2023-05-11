import { IsEmail, IsString } from 'class-validator';

export namespace AuthLogin {
  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }

  export class Response {
    @IsString()
    access_token: string;

    @IsString()
    refresh_token: string;
  }
}
