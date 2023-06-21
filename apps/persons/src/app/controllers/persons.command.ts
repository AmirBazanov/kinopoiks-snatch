import { Controller } from '@nestjs/common';
import {AmqpConnection, RabbitRPC} from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';
import {addRoleRMQConfig, createPersonRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {AddRoleContract, CreatePersonContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class PersonsCommand {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @RabbitRPC(createPersonRMQConfig())
  async createPerson(@Payload() personDto: CreatePersonContract.Request) {
    return await this.personService.createPerson(personDto);
  }

  @RabbitRPC(addRoleRMQConfig())
  async addRole(@Payload() addRoleDto: AddRoleContract.Request) {
    return await this.personService.addRole(addRoleDto)
  }
}
