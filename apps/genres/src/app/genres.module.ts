import { Module } from '@nestjs/common';
import { GenresService } from './services/genres.service';
import {GenreRepository} from "./repositories/genres.repository";
import {ConfigModule} from "@nestjs/config";
import {GenresEntity, TypeormModuleConfig} from "@kinopoisk-snitch/typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {rmqGenreConfig, rmqMovieConfig, rmqPersonConfig, } from "@kinopoisk-snitch/rmq-configs";
import {GenresCommand} from "./controllers/genres.command";
import {GenresEvent} from "./controllers/genres.event";
import {GenresQuery} from "./controllers/genres.query";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([GenresEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqGenreConfig()),
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonConfig()),
    RabbitMQModule.forRoot(RabbitMQModule, rmqMovieConfig()),
  ],
  controllers: [GenresCommand, GenresEvent, GenresQuery],
  providers: [GenresService, GenreRepository],
})
export class GenresModule {}
