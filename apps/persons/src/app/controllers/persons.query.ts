import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';
import { getArrayPersonsOfMovieRMQConfig, getPersonByIdRMQConfig, getPersonByNameRMQConfig } from '@kinopoisk-snitch/rmq-configs';
import { Payload } from '@nestjs/microservices';
import { IdPersonContract, NamePersonContract } from '@kinopoisk-snitch/contracts';

@Controller()
export class PersonsQuery {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitRPC(getPersonByIdRMQConfig())
  async getPersonById(@Payload() personDto: IdPersonContract.Request) {
    return await this.personService.getPersonById(personDto);
  }

  @RabbitRPC(getPersonByNameRMQConfig())
  async getPersonByName(@Payload() personDto: string) {
    return await this.personService.getPersonByName(personDto);
  }

  @RabbitRPC(getArrayPersonsOfMovieRMQConfig())
  async getPersonsOfMovie(@Payload() id: number) {
    return await this.personService.getPersonsOfMovie(id);
  }
}