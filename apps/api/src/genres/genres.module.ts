import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { GenreCommand } from './api-gateway/genre.command';
import { GenreEvent } from './api-gateway/genre.event';
import { GenreQuery } from './api-gateway/genre.query';
import {rmqGenreConfig} from "@kinopoisk-snitch/rmq-configs";

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqGenreConfig()),
  ],
  controllers: [GenreCommand, GenreQuery, GenreEvent],
})
export class GenresModule {}
