import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';
import { getPersonByIdRMQConfig, getPersonByNameRMQConfig } from '@kinopoisk-snitch/rmq-configs';
import { Payload } from '@nestjs/microservices';

@Controller()
export class PersonsQuery {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitRPC(getPersonByIdRMQConfig())
  async getPersonById(@Payload() person_id: number) {
    return await this.personService.getPersonById(person_id);
  }

  @RabbitRPC(getPersonByNameRMQConfig())
  async getPersonByName(@Payload() fullName: string) {
    return await this.personService.getPersonByName(fullName);
  }
}