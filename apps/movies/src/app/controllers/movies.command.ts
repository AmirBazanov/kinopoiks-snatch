import { Controller } from '@nestjs/common';

import { MoviesService } from '../services/movies.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  createAwardConfig,
  createMovieRMQConfig,
  deleteAwardConfig,
  editAwardConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { Payload } from '@nestjs/microservices';
import {
  CreateAwardContract,
  CreateMovieContract,
  EditAwardContract,
} from '@kinopoisk-snitch/contracts';

@Controller()
export class MoviesCommand {
  constructor(private readonly moviesService: MoviesService) {}

  @RabbitRPC(createMovieRMQConfig())
  async createMovie(@Payload() movieDto: CreateMovieContract.Request) {
    await this.moviesService.createMovie(movieDto);
  }

  @RabbitRPC(createAwardConfig())
  async createAward(@Payload() awardInfo: CreateAwardContract.Request) {
    await this.moviesService.createAward(awardInfo);
  }

  @RabbitRPC(editAwardConfig())
  async editAward(@Payload() awardInfo: EditAwardContract.Request) {
    await this.moviesService.editAward(awardInfo);
  }

  @RabbitRPC(deleteAwardConfig())
  async deleteAward(@Payload() award_id: number) {
    await this.moviesService.deleteAward(award_id);
  }
}
