import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {AwardCommand} from "./api-gateway/award.command";
import {AwardQuery} from "./api-gateway/award.query";
import {rmqAwardConfig} from "@kinopoisk-snitch/rmq-configs";

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqAwardConfig()),
  ],
  controllers: [AwardCommand, AwardQuery],
  providers: [],
})
export class AwardModule {}
