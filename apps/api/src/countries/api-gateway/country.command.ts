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
      await this.amqpConnection.publish(
        createCountryRMQConfig().exchange,
        createCountryRMQConfig().routingKey,
        countryDto,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
