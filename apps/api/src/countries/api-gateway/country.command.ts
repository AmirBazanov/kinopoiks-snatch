import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateCountryDto } from '../dtos/create-country.dto';
import {createCountryRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {CreateCountryContract} from "@kinopoisk-snitch/contracts";

@Controller('/countries')
export class CountryCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createCountry')
  async createCountry(@Body() countryDto: CreateCountryDto) {
    try {
      const response = await this.amqpConnection.request<CreateCountryContract.Response>({
        exchange: createCountryRMQConfig().exchange,
        routingKey: createCountryRMQConfig().routingKey,
        payload: countryDto,
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}
