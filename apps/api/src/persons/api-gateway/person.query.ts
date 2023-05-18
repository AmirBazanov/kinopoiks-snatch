import { Controller, Get, Param} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('/persons')
export class PersonQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/:id')
  async getPersonById(@Param('id') person_id: number)
  {
    const person = await this.amqpConnection.request({
      exchange: 'GetPersonsExchange',
      routingKey: 'get-person-by-id',
      payload: person_id,
    });

    return person;
  }

}