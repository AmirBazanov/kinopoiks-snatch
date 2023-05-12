import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import { AuthLogin, AuthRegister } from '@kinopoisk-snitch/contracts';
import {
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
}
