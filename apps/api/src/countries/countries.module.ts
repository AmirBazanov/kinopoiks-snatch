import { Module } from '@nestjs/common';
import {TypeormModuleConfig, CountriesEntity} from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { CountryCommand } from './api-gateway/country.command';
import { CountryEvent } from './api-gateway/country.event';
import { CountryQuery } from './api-gateway/country.query';
import {rmqCountryConfig} from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    TypeormModuleConfig,
    TypeOrmModule.forFeature([CountriesEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqCountryConfig()),
  ],
  controllers: [CountryCommand, CountryQuery, CountryEvent],
})
export class CountriesModule {}
