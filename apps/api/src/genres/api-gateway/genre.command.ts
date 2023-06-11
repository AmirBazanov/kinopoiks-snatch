import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import {createGenreRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {CreateGenreContract} from "@kinopoisk-snitch/contracts";

@Controller('/genres')
export class GenreCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createGenre')
  async createMovie(@Body() genreDto: CreateGenreDto) {
    try {
      await this.amqpConnection.publish(
        createGenreRMQConfig().exchange,
        createGenreRMQConfig().routingKey,
        genreDto,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
