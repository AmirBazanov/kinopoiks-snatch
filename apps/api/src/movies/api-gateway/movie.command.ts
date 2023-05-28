import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import {createMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {CreateMovieContract} from "@kinopoisk-snitch/contracts";

@Controller('/movies')
export class MovieCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createMovie')
  async createMovie(@Body() movieDto: CreateMovieDto) {
    try {
      const response = await this.amqpConnection.request<CreateMovieContract.Response>({
        exchange: createMovieRMQConfig().exchange,
        routingKey: createMovieRMQConfig().routingKey,
        payload: movieDto,
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}
