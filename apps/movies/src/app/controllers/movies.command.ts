import { Controller, Get } from '@nestjs/common';

import { MoviesService } from '../services/movies.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {createMovieRMQConfig, getMovieByTitleRMQConfig, getMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {CreateMovieContract, IdMovieContract, TitleMovieContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class MoviesCommand {
  constructor(private readonly moviesService: MoviesService) {}

  @RabbitRPC(createMovieRMQConfig())
  async createMovie(@Payload() movieDto: CreateMovieContract.Request) {
    return await this.moviesService.createMovie(movieDto);
  }

  @RabbitRPC(getMovieRMQConfig())
  async getMovieById(@Payload() movieDto: IdMovieContract.Request) {
    return await this.moviesService.getMovieById(movieDto);
  }

  @RabbitRPC(getMovieByTitleRMQConfig())
  async getMovieByTitle(@Payload() movieDto: TitleMovieContract.Request) {
    return await this.moviesService.getMovieByTitle(movieDto);
  }
}
