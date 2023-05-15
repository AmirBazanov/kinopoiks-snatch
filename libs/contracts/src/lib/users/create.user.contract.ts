import { IsBoolean, IsString } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateUserContract {
  export class Request {
    @IsString()
    private readonly email: string;
    @IsString()
    private readonly password: string;
    @IsString()
    private readonly user_name: string;
    @IsString()
    private readonly community: string;
    @IsString()
    private readonly birthday: string;
    @IsBoolean()
    private readonly gender: boolean;
    @IsString()
    private readonly quote: string;
  }

  export class Response {}
}
