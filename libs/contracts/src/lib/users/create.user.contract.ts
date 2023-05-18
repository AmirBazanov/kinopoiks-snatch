import { IsBoolean, IsOptional, IsString } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateUserContract {
  export class Request {
    @IsString()
    private readonly email: string;
    @IsString()
    private readonly password: string;
    @IsString()
    private readonly user_name: string;
    @IsOptional()
    @IsString()
    private readonly community: string;
    @IsOptional()
    @IsString()
    private readonly birthday: string;
    @IsOptional()
    @IsBoolean()
    private readonly gender: boolean;
    @IsOptional()
    @IsString()
    private readonly quote: string;
  }

  export class Response {}
}
