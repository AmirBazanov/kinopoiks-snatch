import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {AwardCommand} from "./api-gateway/award.command";
import {rmqAwardConfig} from "@kinopoisk-snitch/rmq-configs";
import {JwtModule} from "@nestjs/jwt";


@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqAwardConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AwardCommand],
  providers: [],
})
export class AwardModule {}
