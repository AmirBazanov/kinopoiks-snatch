import { Module } from '@nestjs/common';

import { MoviesCommand } from './controllers/movies.command';
import { MoviesService } from './services/movies.service';
import {MoviesEvent} from "./controllers/movies.event";
import {MoviesQuery} from "./controllers/movies.query";
import {ConfigModule} from "@nestjs/config";
import {
  AwardsEntity,
  CountriesEntity,
  GenresEntity,
  MoviesEntity,
  MoviesPersonsRolesEntity,
  TypeormModuleConfig
} from "@kinopoisk-snitch/typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {rmqAwardConfig, rmqGenreConfig, rmqMovieConfig, rmqPersonConfig} from "@kinopoisk-snitch/rmq-configs";
import {MovieRepository} from "./repositories/movie.repository";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([MoviesEntity, GenresEntity, CountriesEntity, MoviesPersonsRolesEntity, AwardsEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqMovieConfig()),
    RabbitMQModule.forRoot(RabbitMQModule, rmqGenreConfig()),
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonConfig()),
    RabbitMQModule.forRoot(RabbitMQModule, rmqAwardConfig()),
  ],
  controllers: [MoviesCommand, MoviesEvent, MoviesQuery],
  providers: [MoviesService, MovieRepository],
})
export class AppModule {}
