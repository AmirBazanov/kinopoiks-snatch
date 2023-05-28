import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {IdCountryContract} from '@kinopoisk-snitch/contracts';
import {
  getAllCountriesRMQConfig,
  getCountryByNameRMQConfig,
  getCountryRMQConfig,
  getMovieRMQConfig
} from "@kinopoisk-snitch/rmq-configs";
import {NameCountryContract} from "../../../../../libs/contracts/src/lib/countres/name.country.contract";
import {AllCountriesContract} from "../../../../../libs/contracts/src/lib/countres/all.countries.contract";


@Controller('/countries')
export class CountryQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getCountry/:id')
  async getCountryById(@Param('id') country_id: number) {
    if (isNaN(Number(country_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const response = await this.amqpConnection.request<IdCountryContract.Response>({
        exchange: getCountryRMQConfig().exchange,
        routingKey: getCountryRMQConfig().routingKey,
        payload: country_id,
      });
      return response;
    }
  }
  @Get('/getCountryName')
  async getCountryByName(@Body() name: NameCountryContract.Request) {
      const response = await this.amqpConnection.request<NameCountryContract.Response>({
        exchange: getCountryByNameRMQConfig().exchange,
        routingKey: getCountryByNameRMQConfig().routingKey,
        payload: name,
      });
      return response;
  }
  @Get('/getAllCountries')
  async getAllCountries() {
    const response = await this.amqpConnection.request<AllCountriesContract.Response>({
      exchange: getAllCountriesRMQConfig().exchange,
      routingKey: getAllCountriesRMQConfig().routingKey,
    });
    return response;
  }
}
