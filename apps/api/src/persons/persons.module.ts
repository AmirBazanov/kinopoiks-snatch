import { Module } from '@nestjs/common';
import { PersonsEntity, TypeormModuleConfig } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PersonsCommand } from './api-gateway/person.command';
import { rmqPersonConfig } from '@kinopoisk-snitch/rmq-configs'
import { PersonsEvent } from './api-gateway/person.event';
import { PersonsQuery } from './api-gateway/person.query';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonConfig()),
  ],
  controllers: [
    PersonsCommand,
    PersonsEvent,
    PersonsQuery,
  ],
})
export class PersonsModule {}
