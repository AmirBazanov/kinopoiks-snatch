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
import {getCountryRMQConfig, getMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";

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
}
