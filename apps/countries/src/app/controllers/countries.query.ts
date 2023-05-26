import { Controller, Get } from '@nestjs/common';

import { CountriesService } from '../services/countries.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {getAllMoviesRMQConfig, getMovieByTitleRMQConfig, getMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {IdMovieContract, TitleMovieContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class CountriesQuery {
  constructor(private readonly moviesService: CountriesService) {}

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
}
