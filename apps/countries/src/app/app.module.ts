import { Module } from '@nestjs/common';
import { CountriesCommand } from './controllers/countries.command';
import { CountriesService } from './services/countries.service';
import {CountriesEvent} from "./controllers/countries.event";
import {CountriesQuery} from "./controllers/countries.query";
import {CountriesEntity, TypeormModuleConfig} from "@kinopoisk-snitch/typeorm";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {rmqCountryConfig} from "@kinopoisk-snitch/rmq-configs";
import {CountryRepository} from "./repositories/country.repository";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([CountriesEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqCountryConfig()),
  ],
  controllers: [CountriesCommand, CountriesEvent, CountriesQuery],
  providers: [CountriesService, CountryRepository],
})
export class AppModule {}
