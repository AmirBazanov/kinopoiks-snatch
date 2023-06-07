import { Controller } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';

@Controller()
export class PersonsCommand {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  
}