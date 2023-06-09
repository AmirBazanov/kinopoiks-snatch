import { Module } from '@nestjs/common';
import { PersonsService } from './services/persons.service';
import { ConfigModule } from '@nestjs/config';
import {
  AwardsEntity,
  MoviesPersonsRolesEntity,
  PersonsEntity,
  RolesEntity,
  TypeormModuleConfig
} from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PersonsCommand } from './controllers/persons.command';
import { PersonsEvent } from './controllers/persons.event';
import { PersonsQuery } from './controllers/persons.query';
import { rmqGenreConfig, rmqMovieConfig, rmqPersonConfig } from '@kinopoisk-snitch/rmq-configs';
import { PersonRepository } from './repositories/person.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([PersonsEntity, AwardsEntity, MoviesPersonsRolesEntity, RolesEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonConfig()),
    RabbitMQModule.forRoot(RabbitMQModule, rmqGenreConfig()),
    RabbitMQModule.forRoot(RabbitMQModule, rmqMovieConfig()),
  ],
  controllers: [PersonsCommand, PersonsEvent, PersonsQuery],
  providers: [PersonsService, PersonRepository],
})
export class PersonsModule {}
