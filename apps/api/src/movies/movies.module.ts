import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MovieQuery } from './api-gateway/movie.query';
import { rmqMovieConfig } from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqMovieConfig()),
  ],
  controllers: [ MovieQuery],
})
export class MoviesModule {}
