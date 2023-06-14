import { Controller, HttpException } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import {
  AuthGoogle,
  AuthLogin,
  AuthRegister,
  AuthUpdateToken,
  AuthVk,
  CreateUserContract,
} from '@kinopoisk-snitch/contracts';
import {
  authGoogleRMQConfig,
  authLoginRMQConfig,
  authRegisterRMQConfig,
  authUpdateToken,
  authVkRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { generate } from 'generate-password';
import { AuthService } from './auth.service';

@Controller()
export class AuthCommands {
  constructor(private readonly authService: AuthService) {}

  @RabbitRPC(authLoginRMQConfig())
  async login(@Payload() data: AuthLogin.Request) {
    return  this.authService.singIn(data.email, data.password);
  }

  @RabbitRPC(authRegisterRMQConfig())
  async register(@Payload() data: AuthRegister.Request) {
    return this.authService.register(data);
  }

  @RabbitRPC(authGoogleRMQConfig())
  async google(@Payload() data: AuthGoogle.Request) {
    const userData: Partial<CreateUserContract.Request> = {
      email: data.email,
      user_name: data.name,
      external_service_id: data.providerId,
      password: generate({
        length: 15,
        numbers: true,
        symbols: true,
        lowercase: true,
      }),
    };
    return this.authService.googleAuth(userData);
  }

  @RabbitRPC(authVkRMQConfig())
  async vk(@Payload() data: AuthVk.Request) {
    if (!data.email) {
      data.email = data.name + data.providerId + '@vk.ru';
    }
    const userData: Partial<CreateUserContract.Request> = {
      email: data.email,
      user_name: data.name,
      external_service_id: data.providerId,
      password: generate({
        length: 15,
        numbers: true,
        symbols: true,
        lowercase: true,
      }),
    };
    return this.authService.vkAuth(userData);
  }

  @RabbitRPC(authUpdateToken())
  async updateToken(@Payload() data: AuthUpdateToken.Request) {
    const updated_token = await this.authService.updateToken(
      data.refresh_token
    );
    if (updated_token instanceof HttpException) {
      return { error: updated_token };
    }
    return updated_token;
  }
}
