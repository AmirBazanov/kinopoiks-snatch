import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { GenreEvent } from './api-gateway/genre.event';
import { GenreQuery } from './api-gateway/genre.query';
import {rmqGenreConfig} from "@kinopoisk-snitch/rmq-configs";

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqGenreConfig()),
  ],
  controllers: [ GenreQuery, GenreEvent],
})
export class GenresModule {}
