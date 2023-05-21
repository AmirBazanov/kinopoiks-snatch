import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';

@Controller()
export class PersonsCommand {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  // @RabbitRPC({
  //   exchange: 'PostPersonsExchange',
  //   routingKey: 'create-person',
  //   queue: 'queue1',
  // })
  // async createPerson(/* */) { /* */ return {} }
}