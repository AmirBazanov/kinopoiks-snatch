import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  AuthGoogle,
  AuthLogin,
  AuthRegister,
  AuthVk,
} from '@kinopoisk-snitch/contracts';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  authGoogleRMQConfig,
  authLoginRMQConfig,
  authRegisterRMQConfig,
  authVkRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { VkOauthGuard } from '../guards/vk-oauth.guard';
import { PassportTokenErrorFilter } from '../exceptions-filters/oauth-exceptions';

@Controller('/auth')
@UsePipes(new ValidationPipe())
export class AuthCommands {
  constructor(private readonly amqpService: AmqpConnection) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.amqpService.request<AuthRegister.Response>({
      ...authRegisterRMQConfig(),
      payload: registerDto,
    });
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.amqpService.request<AuthLogin.Response>({
      ...authLoginRMQConfig(),
      payload: loginDto,
    });
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  @UseFilters(new PassportTokenErrorFilter())
  async google(@Req() googleUser) {
    const { user } = googleUser;
    return this.amqpService.request<AuthGoogle.Response>({
      ...authGoogleRMQConfig(),
      payload: user,
    });
  }

  @Get('/vk')
  @UseGuards(VkOauthGuard)
  @UseFilters(new PassportTokenErrorFilter())
  async vk(@Req() vkUser) {
    const { user } = vkUser;
    return this.amqpService.request<AuthVk.Response>({
      ...authVkRMQConfig(),
      payload: user,
    });
  }
}
