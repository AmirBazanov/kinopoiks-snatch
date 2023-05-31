import { Controller, Get } from '@nestjs/common';

import { MoviesService } from '../services/movies.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {updateMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {UpdateMovieContract} from "../../../../../libs/contracts/src/lib/movies/update.movie.contract";

@Controller()
export class MoviesEvent {
  constructor(private readonly moviesService: MoviesService) {}

  @RabbitRPC(updateMovieRMQConfig())
  async updateMovie(@Payload() movieDto: UpdateMovieContract.Request) {
    return await this.moviesService.updateMovie(movieDto);
  }
}
