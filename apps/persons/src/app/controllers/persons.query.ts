import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';

@Controller()
export class UserQuery {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitRPC({
    exchange: 'GetPersonsExchange',
    routingKey: 'get-person-by-id',
    queue: 'queue2',
  })
  async getPersonById( /* */ ) { /* */ return {} }


}