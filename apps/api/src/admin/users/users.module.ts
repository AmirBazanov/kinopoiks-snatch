import {Module} from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {rmqUserConfig} from "@kinopoisk-snitch/rmq-configs";
import {JwtModule} from "@nestjs/jwt";
import {UserCommand} from "./api-gateway/user.command";


@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UserCommand],
  providers: [],
})
export class UsersModule {}
