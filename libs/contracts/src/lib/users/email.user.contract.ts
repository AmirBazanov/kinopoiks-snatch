import { IsEmail } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EmailUserContract {
  export class Request {
    @IsEmail()
    private readonly email: string;
  }

  export class Response {}
}
