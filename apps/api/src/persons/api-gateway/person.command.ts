import {Body, Controller, Post} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {CreatePersonDto} from "../dtos/create-person.dto";
import {createMovieRMQConfig, createPersonRMQConfig} from "@kinopoisk-snitch/rmq-configs";

@Controller('/persons')
export class PersonsCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createPerson')
  async createPerson(@Body() createPersonDTO: CreatePersonDto) {
    try {
      await this.amqpConnection.publish(
        createPersonRMQConfig().exchange,
        createPersonRMQConfig().routingKey,
        createPersonDTO,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
