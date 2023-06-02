import { Controller } from '@nestjs/common';

import { MoviesService } from '../services/movies.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {createMovieRMQConfig, updateMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {CreateMovieContract, UpdateMovieContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class MoviesCommand {
  constructor(private readonly moviesService: MoviesService) {}

  @RabbitRPC(createMovieRMQConfig())
  async createMovie(@Payload() movieDto: CreateMovieContract.Request) {
    return await this.moviesService.createMovie(movieDto);
  }
}
