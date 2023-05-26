import { Controller, Get } from '@nestjs/common';

import { CountriesService } from '../services/countries.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {
  createCountryRMQConfig,
} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {CreateCountryContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class CountriesCommand {
  constructor(private readonly countriesService: CountriesService) {}

  @RabbitRPC(createCountryRMQConfig())
  async createCountry(@Payload() countryDto: CreateCountryContract.Request) {
    //return await this.countriesService.createMovie(countryDto);
  }
}
