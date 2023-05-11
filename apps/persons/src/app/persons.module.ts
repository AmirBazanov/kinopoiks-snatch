import { Module } from '@nestjs/common';

import { PersonsController } from './base.controller';
import { PersonsService } from './services/persons.service';
import { ConfigModule } from '@nestjs/config';
import { PersonsEntity, TypeormModuleConfig } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqPersonsConfig } from './configs/amqp.persons.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([PersonsEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonsConfig()),
  ],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
