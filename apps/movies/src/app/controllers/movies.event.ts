import { Controller } from '@nestjs/common';

import { MoviesService } from '../services/movies.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {deleteMovieRMQConfig, updateMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {UpdateMovieContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class MoviesEvent {
  constructor(private readonly moviesService: MoviesService) {}
  @RabbitRPC(deleteMovieRMQConfig())
  async deleteMovie(@Payload() id: number) {
    return await this.moviesService.deleteMovie(id);
  }
  @RabbitRPC(updateMovieRMQConfig())
  async updateMovie(@Payload() movieDto: UpdateMovieContract.Request) {
    return await this.moviesService.updateMovie(movieDto);
  }
}
