import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import {
  AuthGoogle,
  AuthLogin,
  AuthRegister,
  CreateUserContract,
} from '@kinopoisk-snitch/contracts';
import {
  authGoogleRMQConfig,
  authLoginRMQConfig,
  authRegisterRMQConfig,
  createUserRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { generate } from 'generate-password';
import { AuthService } from './auth.service';

@Controller()
export class AuthCommands {
  constructor(
    private readonly authService: AuthService,
    private readonly amqpService: AmqpConnection
  ) {}

  @RabbitRPC(authLoginRMQConfig())
  login(@Payload() data: AuthLogin.Request) {
    return this.authService.singIn(data.email, data.password);
  }

  @RabbitRPC(authRegisterRMQConfig())
  register(@Payload() data: AuthRegister.Request) {
    return data;
  }

  @RabbitRPC(authGoogleRMQConfig())
  google(@Payload() data: AuthGoogle.Request) {
    const userData: Partial<CreateUserContract.Request> = {
      email: data.email,
      user_name: data.name,
      password: generate({
        length: 15,
        numbers: true,
        symbols: true,
        lowercase: true,
      }),
    };
    return this.amqpService.request<CreateUserContract.Response>({
      routingKey: createUserRMQConfig().routingKey,
      exchange: createUserRMQConfig().exchange,
      payload: userData,
    });
  }
}
