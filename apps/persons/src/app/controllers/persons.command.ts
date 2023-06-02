import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';
import { getPersonByIdRMQConfig } from '@kinopoisk-snitch/rmq-configs';
import { Payload } from '@nestjs/microservices';

@Controller()
export class PersonsCommand {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @RabbitRPC(getPersonByIdRMQConfig())
  async getPersonById(@Payload() person_id: number) {
    return await this.personService.getPersonById(person_id);
  }
}