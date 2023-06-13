import { Module } from '@nestjs/common';
import { TypeormModuleConfig, MoviesEntity } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MovieCommand } from './api-gateway/movie.command';
import { MovieEvent } from './api-gateway/movie.event';
import { MovieQuery } from './api-gateway/movie.query';
import { rmqMovieConfig } from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqMovieConfig()),
  ],
  controllers: [MovieCommand, MovieQuery, MovieEvent],
})
export class MoviesModule {}
