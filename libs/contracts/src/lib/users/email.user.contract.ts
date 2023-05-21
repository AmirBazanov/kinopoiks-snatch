import { IsEmail } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
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
  }
}
