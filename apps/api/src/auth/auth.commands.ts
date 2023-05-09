import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AuthLogin, AuthRegister } from '@kinopoisk-snitch/contracts';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('/auth')
@UsePipes(new ValidationPipe())
export class AuthCommands {
  constructor(private readonly amqpService: AmqpConnection) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.amqpService.request<AuthRegister.Response>({
      exchange: 'AuthExchange',
      routingKey: 'auth-register',
      payload: registerDto,
    });
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.amqpService.request<AuthLogin.Response>({
      exchange: 'AuthExchange',
      routingKey: 'auth-register',
      payload: loginDto,
    });
  }
}
