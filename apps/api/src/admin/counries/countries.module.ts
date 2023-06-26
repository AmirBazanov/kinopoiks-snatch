import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import {rmqCountryConfig} from "@kinopoisk-snitch/rmq-configs";
import {JwtModule} from "@nestjs/jwt";
import {CountryCommand} from "./api-gateway/country.command";
import {CountryEvent} from "./api-gateway/country.event";



@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqCountryConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [CountryCommand, CountryEvent],
  providers: [],
})
export class CountriesModule {}
