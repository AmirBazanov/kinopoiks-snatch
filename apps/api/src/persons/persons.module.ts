import { Module } from '@nestjs/common';
import { PersonsEntity, TypeormModuleConfig } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PersonCommand } from './api-gateway/person.command';
import { PersonQuery } from './api-gateway/person.query';
import { PersonEvent } from './api-gateway/person.event';
import { rmqPersonConfig } from '@kinopoisk-snitch/rmq-configs'

@Module({
  imports: [
    TypeormModuleConfig,
    TypeOrmModule.forFeature([PersonsEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonConfig()),
  ],
  controllers: [PersonCommand, PersonQuery, PersonEvent],
})
export class PersonsModule {}
