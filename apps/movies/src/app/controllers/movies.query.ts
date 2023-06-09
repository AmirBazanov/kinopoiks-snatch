import { Controller } from '@nestjs/common';

import { MoviesService } from '../services/movies.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {
  getAllMoviesRMQConfig,
  getCountMoviesOfPersonRMQConfig,
  getGenresIdsArrayOfMoviesRMQConfig, getGenresMoviesRMQConfig,
  getMovieByTitleRMQConfig,
  getMovieRMQConfig, getMoviesByFiltersRMQConfig,
  getMoviesOfPersonRMQConfig
} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {FilteredMoviesContract, IdMovieContract, TitleMovieContract} from "@kinopoisk-snitch/contracts";

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

  @RabbitRPC(getGenresMoviesRMQConfig())
  async getMoviesByGenre(@Payload() genre_id: number) {
    return await this.moviesService.getMoviesByGenre(genre_id);
  }

  @RabbitRPC(getMoviesByFiltersRMQConfig())
  async getFilteredMovies(@Payload() filters: FilteredMoviesContract.Request) {
    return await this.moviesService.getFilteredMovies(filters);
  }

  @RabbitRPC(getAllMoviesRMQConfig())
  async getAllMovies() {
    return await this.moviesService.getAllMovies();
  }

  @RabbitRPC(getGenresIdsArrayOfMoviesRMQConfig())
  async getGenresIdsArrayOfMovies(@Payload() arrayIdsMovies: number[]) {
    return await this.moviesService.getGenresIdsArrayOfMovies(arrayIdsMovies);
  }

  @RabbitRPC(getCountMoviesOfPersonRMQConfig())
  async getCountMoviesOfPerson(@Payload() person_id: number) {
    return await this.moviesService.getCountMoviesOfPerson(person_id);
  }

  @RabbitRPC(getMoviesOfPersonRMQConfig())
  async getMoviesOfPerson(@Payload() person_id: number) {
    return await this.moviesService.getMoviesOfPerson(person_id);
  }
}
