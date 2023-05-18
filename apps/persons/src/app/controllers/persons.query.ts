import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';
import { Payload } from '@nestjs/microservices';
import {
  getPersonByIdRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class UserQuery {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitRPC(getPersonByIdRMQConfig())
  async getPersonById(@Payload() person_id: number) {
    return this.personService.getPersonById(person_id);
  }
}