import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { CountryEvent } from './api-gateway/country.event';
import { CountryQuery } from './api-gateway/country.query';
import {rmqCountryConfig} from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqCountryConfig()),
  ],
  controllers: [ CountryQuery, CountryEvent],
})
export class CountriesModule {}
