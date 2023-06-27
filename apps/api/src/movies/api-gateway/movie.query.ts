import {Body, Controller, Get, HttpException, HttpStatus, Param,} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {
  AllMoviesContract,
  FilteredMoviesContract,
  IdMovieContract,
  TitleMovieContract
} from '@kinopoisk-snitch/contracts';
import {
  getAllMoviesRMQConfig,
  getGenresMoviesRMQConfig,
  getMovieByTitleRMQConfig,
  getMovieRMQConfig,
  getMoviesByFiltersRMQConfig
} from "@kinopoisk-snitch/rmq-configs";
import {FiltersDto} from "../dtos/filters.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateMovieDto} from "../../admin/movies/dtos/create-movie.dto";

@ApiTags('Movies')
@Controller('/movies')
export class MovieQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getMovie/:id')
  @ApiOperation({ summary: 'Get Movie' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateMovieDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  async getMovieById(@Param('id') movie_id: number) {
    if (isNaN(Number(movie_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<IdMovieContract.Response>({
        exchange: getMovieRMQConfig().exchange,
        routingKey: getMovieRMQConfig().routingKey,
        payload: movie_id,
        timeout: 100000,
      });
    }
  }

  @Get('/getMovieByTitle')
  @ApiOperation({ summary: 'Get Movie by title' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateMovieDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  async getMovieByTitle(@Body() movie_title: TitleMovieContract.Request) {
    return await this.amqpConnection.request<TitleMovieContract.Response>({
      exchange: getMovieByTitleRMQConfig().exchange,
      routingKey: getMovieByTitleRMQConfig().routingKey,
      payload: movie_title,
    });
  }

  @Get('/getMovieByGenre/:id')
  @ApiOperation({ summary: 'Get Movies by genre' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateMovieDto,
    isArray: true
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  async getMovieByGenreId(@Param('id') genre_id: number) {
    if (isNaN(Number(genre_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<IdMovieContract.Response>({
        exchange: getGenresMoviesRMQConfig().exchange,
        routingKey: getGenresMoviesRMQConfig().routingKey,
        payload: genre_id,
      });
    }
  }

  @Get('/getMoviesByFilters')
  @ApiOperation({ summary: 'Get Movies by filter' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateMovieDto,
    isArray: true
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  async getMoviesByFilters(@Body() filters: FiltersDto) {
    return await this.amqpConnection.request<FilteredMoviesContract.Response>({
      exchange: getMoviesByFiltersRMQConfig().exchange,
      routingKey: getMoviesByFiltersRMQConfig().routingKey,
      payload: filters
    });
  }

  @Get('/getAllMovies')
  @ApiOperation({ summary: 'Get Movies' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateMovieDto,
    isArray: true
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  async getAllMovies() {
    return await this.amqpConnection.request<AllMoviesContract.Response>({
      exchange: getAllMoviesRMQConfig().exchange,
      routingKey: getAllMoviesRMQConfig().routingKey,
    });
  }
}
