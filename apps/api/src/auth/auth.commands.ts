import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  AuthGoogle,
  AuthLogin,
  AuthRegister,
} from '@kinopoisk-snitch/contracts';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  authGoogleRMQConfig,
  authLoginRMQConfig,
  authRegisterRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { VkOauthGuard } from '../guards/vk-oauth.guard';

@Controller('/auth')
@UsePipes(new ValidationPipe())
export class AuthCommands {
  constructor(private readonly amqpService: AmqpConnection) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.amqpService.request<AuthRegister.Response>({
      exchange: authRegisterRMQConfig().exchange,
      routingKey: authRegisterRMQConfig().routingKey,
      payload: registerDto,
    });
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.amqpService.request<AuthLogin.Response>({
      exchange: authLoginRMQConfig().exchange,
      routingKey: authLoginRMQConfig().routingKey,
      payload: loginDto,
    });
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async google(@Req() googleUser) {
    const { user } = googleUser;
    return this.amqpService.request<AuthGoogle.Response>({
      exchange: authGoogleRMQConfig().exchange,
      routingKey: authGoogleRMQConfig().routingKey,
      payload: user,
    });
  }

  @Get('/vk')
  @UseGuards(VkOauthGuard)
  async vk(@Req() vkUser) {
    console.log(vkUser.user);
  }
}
