import { Controller } from '@nestjs/common';

import { MoviesService } from '../services/movies.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {
  deleteMovieRMQConfig,
  getAllMoviesRMQConfig,
  getGenresIdsArrayOfMoviesRMQConfig,
  getMovieByTitleRMQConfig,
  getMovieRMQConfig
} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {IdMovieContract, TitleMovieContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class MoviesQuery {
  constructor(private readonly moviesService: MoviesService) {}

  @RabbitRPC(getMovieRMQConfig())
  async getMovieById(@Payload() movieDto: IdMovieContract.Request) {
    return await this.moviesService.getMovieById(movieDto);
  }

  @RabbitRPC(getMovieByTitleRMQConfig())
  async getMovieByTitle(@Payload() movieDto: TitleMovieContract.Request) {
    return await this.moviesService.getMovieByTitle(movieDto);
  }

  @RabbitRPC(getAllMoviesRMQConfig())
  async getAllMovies() {
    return await this.moviesService.getAllMovies();
  }

  @RabbitRPC(getGenresIdsArrayOfMoviesRMQConfig())
  async getGenresIdsArrayOfMovies(@Payload() arrayIdsMovies: number[]) {
    return await this.moviesService.getGenresIdsArrayOfMovies(arrayIdsMovies);
  }
}
