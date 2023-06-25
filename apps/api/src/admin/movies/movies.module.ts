import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import {rmqMovieConfig} from "@kinopoisk-snitch/rmq-configs";
import {JwtModule} from "@nestjs/jwt";
import {MovieCommand} from "./api-gateway/movie.command";
import {MovieEvent} from "./api-gateway/movie.event";



@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqMovieConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [MovieCommand, MovieEvent],
  providers: [],
})
export class MoviesModule {}
