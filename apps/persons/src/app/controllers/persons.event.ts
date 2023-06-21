import {AmqpConnection, RabbitRPC} from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { PersonsService } from '../services/persons.service';
import {deletePersonRMQConfig, updatePersonRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {UpdatePersonContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class PersonsEvent {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitRPC(updatePersonRMQConfig())
  async updatePerson(@Payload() personDto: UpdatePersonContract.Request) {
    return await this.personService.updatePerson(personDto);
  }

  @RabbitRPC(deletePersonRMQConfig())
  async deletePerson(@Payload() person_id: number) {
    return await this.personService.deletePerson(person_id);
  }
}
