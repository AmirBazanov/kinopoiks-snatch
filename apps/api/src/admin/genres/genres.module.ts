import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import {rmqGenreConfig} from "@kinopoisk-snitch/rmq-configs";
import {JwtModule} from "@nestjs/jwt";
import {GenreCommand} from "./api-gateway/genre.command";



@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqGenreConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [GenreCommand],
  providers: [],
})
export class GenresModule {}
