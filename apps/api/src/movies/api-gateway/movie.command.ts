import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import {createMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";

@Controller('/movies')
export class MovieCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createMovie')
  async createMovie(@Body() movieDto: CreateMovieDto) {
    try {
      const response = await this.amqpConnection.request({
        exchange: createMovieRMQConfig().exchange,
        routingKey: createMovieRMQConfig().routingKey,
        payload: movieDto,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
