import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {AllGenresContract, IdGenreContract, NameGenreContract} from '@kinopoisk-snitch/contracts';
import {
  getAllGenresRMQConfig,
  getGenreByNameRMQConfig,
  getGenreRMQConfig,
} from "@kinopoisk-snitch/rmq-configs";

@Controller('/genres')
export class GenreQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getGenre/:id')
  async getGenreById(@Param('id') genre_id: number) {
    if (isNaN(Number(genre_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const genre = await this.amqpConnection.request<IdGenreContract.Response>({
        exchange: getGenreRMQConfig().exchange,
        routingKey: getGenreRMQConfig().routingKey,
        payload: genre_id,
      });
      return genre;
    }
  }

  @Get('/getGenreByName')
  async getGenreByName(@Body() genre_name: NameGenreContract.Request) {
    const genre = await this.amqpConnection.request<NameGenreContract.Response>({
      exchange: getGenreByNameRMQConfig().exchange,
      routingKey: getGenreByNameRMQConfig().routingKey,
      payload: genre_name,
    });
    return genre;
  }

  @Get('/getAllGenres')
  async getAllGenres() {
    const genres = await this.amqpConnection.request<AllGenresContract.Response>({
      exchange: getAllGenresRMQConfig().exchange,
      routingKey: getAllGenresRMQConfig().routingKey,
    });
    return genres;
  }
}
