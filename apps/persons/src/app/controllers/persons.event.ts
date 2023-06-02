import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { PersonsService } from '../services/persons.service';

@Controller()
export class PersonsEvent {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

 
}