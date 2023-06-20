import {
  Body,
  Controller, Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  AllMoviesContract,
  DeleteMovieContract,
  FilteredMoviesContract,
  IdMovieContract,
  TitleMovieContract
} from '@kinopoisk-snitch/contracts';
import {
  deleteMovieRMQConfig,
  getAllMoviesRMQConfig, getGenresMoviesRMQConfig,
  getMovieByTitleRMQConfig,
  getMovieRMQConfig, getMoviesByFiltersRMQConfig
} from "@kinopoisk-snitch/rmq-configs";
import {FiltersDto} from "../dtos/filters.dto";

@Controller('/movies')
export class MovieQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getMovie/:id')
  async getMovieById(@Param('id') movie_id: number) {
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
        timeout: 100000,
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

  @Get('/getMovieByGenre/:id')
  async getMovieByGenreId(@Param('id') genre_id: number) {
    if (isNaN(Number(genre_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const movie = await this.amqpConnection.request<IdMovieContract.Response>({
        exchange: getGenresMoviesRMQConfig().exchange,
        routingKey: getGenresMoviesRMQConfig().routingKey,
        payload: genre_id,
      });
      return movie;
    }
  }

  @Get('/getMoviesByFilters')
  async getMoviesByFilters(@Body() filters: FiltersDto) {
    const movies = await this.amqpConnection.request<FilteredMoviesContract.Response>({
      exchange: getMoviesByFiltersRMQConfig().exchange,
      routingKey: getMoviesByFiltersRMQConfig().routingKey,
      payload: filters
    });
    return movies;
  }

  @Get('/getAllMovies')
  async getAllMovies() {
    const movies = await this.amqpConnection.request<AllMoviesContract.Response>({
      exchange: getAllMoviesRMQConfig().exchange,
      routingKey: getAllMoviesRMQConfig().routingKey,
    });
    return movies;
  }
}
