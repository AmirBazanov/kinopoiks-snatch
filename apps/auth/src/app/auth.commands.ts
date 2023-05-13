import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import {
  AuthGoogle,
  AuthLogin,
  AuthRegister,
} from '@kinopoisk-snitch/contracts';
import {
  authGoogleRMQConfig,
  authLoginRMQConfig,
  authRegisterRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class AuthCommands {
  constructor(private readonly appService: AppService) {}

  @RabbitRPC(authRegisterRMQConfig())
  register(@Payload() data: AuthRegister.Request) {
    console.log(data);
    return data;
  }

  @RabbitRPC(authLoginRMQConfig())
  login(@Payload() data: AuthLogin.Request) {
    console.log(data);
    return data;
  }

  @RabbitRPC(authGoogleRMQConfig())
  google(@Payload() data: AuthGoogle.Request) {
    // const userData: CreateUserContract.Request = {
    //   email: data.email,
    //   user_name: data.name,
    // };
  }
}
