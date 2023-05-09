import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import { AuthLogin, AuthRegister } from '@kinopoisk-snitch/contracts';

@Controller()
export class AppCommands {
  constructor(private readonly appService: AppService) {}

  @RabbitRPC({
    routingKey: 'auth-register',
    exchange: 'AuthExchange',
    queue: 'AuthQueue',
  })
  register(@Payload() data: AuthRegister.Request) {
    console.log(data);
    return data;
  }

  @RabbitRPC({
    routingKey: 'auth-login',
    exchange: 'AuthExchange',
    queue: 'AuthQueue',
  })
  login(@Payload() data: AuthLogin.Request) {
    console.log(data);
    return data;
  }
}
