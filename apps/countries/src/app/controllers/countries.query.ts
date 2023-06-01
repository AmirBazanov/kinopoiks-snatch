import { Controller, Get } from '@nestjs/common';

import { CountriesService } from '../services/countries.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {
  getAllCountriesRMQConfig,
  getCountryByNameRMQConfig,
  getCountryRMQConfig
} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {IdCountryContract, NameCountryContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class CountriesQuery {
  constructor(private readonly countriesService: CountriesService) {}

  @RabbitRPC(getCountryRMQConfig())
  async getCountryById(@Payload() countryDto: IdCountryContract.Request) {
    return await this.countriesService.getCountryById(countryDto);
  }

  @RabbitRPC(getCountryByNameRMQConfig())
  async getCountryByName(@Payload() countryName: NameCountryContract.Request) {
    return await this.countriesService.getCountryByName(countryName.name);
  }

  @RabbitRPC(getAllCountriesRMQConfig())
  async getAllCountries() {
    return await this.countriesService.getAllCountries();
  }
}
