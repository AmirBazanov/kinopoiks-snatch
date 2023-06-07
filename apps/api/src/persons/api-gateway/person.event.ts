import { Controller } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('/persons')
export class PersonsEvent {
  constructor(private readonly amqpConnection: AmqpConnection) {}

}
