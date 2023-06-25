import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { rmqPersonConfig} from "@kinopoisk-snitch/rmq-configs";
import {JwtModule} from "@nestjs/jwt";
import {PersonsCommand} from "./api-gateway/person.command";
import {PersonsEvent} from "./api-gateway/person.event";


@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PersonsCommand, PersonsEvent],
  providers: [],
})
export class PersonsModule {}
