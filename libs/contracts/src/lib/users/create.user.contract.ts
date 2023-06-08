import { IsOptional, IsString } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateUserContract {
  export class Request {
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsString()
    user_name: string;
    @IsOptional()
    @IsString()
    community?: string;
    @IsOptional()
    @IsString()
    birthday?: Date;
    @IsOptional()
    @IsString()
    gender?: string;
    @IsOptional()
    @IsString()
    quote?: string;
    @IsOptional()
    @IsString()
    external_service_id?: string;
  }
}
