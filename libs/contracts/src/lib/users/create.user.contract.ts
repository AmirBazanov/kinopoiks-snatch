import { IsOptional, IsString } from 'class-validator';
import { NotFoundException } from '@nestjs/common';

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

  export class Response {
    user_id: number;
    email: string;
    user_name: string;
    community: string;
    birthday: Date;
    gender: string;
    quote: string;
    created_at: Date;
    is_admin: boolean;
    is_eng: boolean;
    error?: NotFoundException;
  }
}
