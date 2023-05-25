import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {IdMovieContract, TitleMovieContract} from '@kinopoisk-snitch/contracts';
import {getMovieByTitleRMQConfig, getMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";

@Controller('/movies')
export class MovieQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getMovie/:id')
  async getMovieById(@Param('id') movie_id: string) {
    if (isNaN(Number(movie_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const movie = await this.amqpConnection.request<IdMovieContract.Response>({
        exchange: getMovieRMQConfig().exchange,
        routingKey: getMovieRMQConfig().routingKey,
        payload: movie_id,
      });
      return movie;
    }
  }

  @Get('/getMovieByTitle')
  async getMovieByTitle(@Body() movie_title: TitleMovieContract.Request) {
    const movie = await this.amqpConnection.request<TitleMovieContract.Response>({
      exchange: getMovieByTitleRMQConfig().exchange,
      routingKey: getMovieByTitleRMQConfig().routingKey,
      payload: movie_title,
    });
    return movie;
  }
}