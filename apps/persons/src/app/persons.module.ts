import { Module } from '@nestjs/common';
import { PersonsService } from './services/persons.service';
import { ConfigModule } from '@nestjs/config';
import { AwardsEntity, PersonsEntity, TypeormModuleConfig } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PersonsCommand } from './controllers/persons.command';
import { PersonsEvent } from './controllers/persons.event';
import { PersonsQuery } from './controllers/persons.query';
import { rmqPersonConfig } from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([PersonsEntity, AwardsEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonConfig()),
  ],
  controllers: [PersonsCommand, PersonsEvent, PersonsQuery],
  providers: [PersonsService],
})
export class PersonsModule {}
