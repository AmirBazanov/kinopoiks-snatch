import { Controller} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('/persons')
export class PersonQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

}