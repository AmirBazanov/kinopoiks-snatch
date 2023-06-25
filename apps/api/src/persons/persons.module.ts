import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqPersonConfig } from '@kinopoisk-snitch/rmq-configs'
import { PersonsQuery } from './api-gateway/person.query';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqPersonConfig()),
  ],
  controllers: [
    PersonsQuery,
  ],
})
export class PersonsModule {}
