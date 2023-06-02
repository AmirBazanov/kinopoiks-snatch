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
      const response = await this.amqpConnection.request<CreateGenreContract.Response>({
        exchange: createGenreRMQConfig().exchange,
        routingKey: createGenreRMQConfig().routingKey,
        payload: genreDto,
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}
