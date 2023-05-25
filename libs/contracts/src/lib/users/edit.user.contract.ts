// eslint-disable-next-line @typescript-eslint/no-namespace
import { IsOptional, IsString } from 'class-validator';

export namespace EditUserContract {
  export class Request {
    @IsString()
    user_id: string;
    @IsString()
    @IsOptional()
    user_name?: string;
    @IsOptional()
    @IsString()
    birthday?: Date;
    @IsOptional()
    @IsString()
    gender?: string;
    @IsOptional()
    @IsString()
    quote?: string;
  }
}
