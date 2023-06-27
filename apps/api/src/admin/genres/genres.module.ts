import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import {rmqGenreConfig} from "@kinopoisk-snitch/rmq-configs";
import {JwtModule} from "@nestjs/jwt";
import {GenreCommand} from "./api-gateway/genre.command";
import {GenreEvent} from "./api-gateway/genre.event";



@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqGenreConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [GenreCommand, GenreEvent],
  providers: [],
})
export class GenresModule {}
