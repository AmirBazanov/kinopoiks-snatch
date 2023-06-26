import { Controller } from '@nestjs/common';

import { CountriesService } from '../services/countries.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {deleteCountryRMQConfig, updateCountryRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {UpdateCountryContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class CountriesEvent {
  constructor(private readonly countriesService: CountriesService) {}

  @RabbitRPC(updateCountryRMQConfig())
  async updateCountry(@Payload() countryDto: UpdateCountryContract.Request) {
    return await this.countriesService.updateCountry(countryDto);
  }

  @RabbitRPC(deleteCountryRMQConfig())
  async deleteCountry(@Payload() country_id: number) {
    return await this.countriesService.deleteCountry(country_id);
  }
}
