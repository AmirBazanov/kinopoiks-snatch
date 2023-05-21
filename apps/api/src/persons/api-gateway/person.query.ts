import { Controller, Get, Param} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { getPersonByIdRMQConfig } from '@kinopoisk-snitch/rmq-configs';

@Controller('/persons')
export class PersonQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/:id')
  async getPersonById(@Param('id') person_id: number)
  {
    return await this.amqpConnection.request({
      exchange: getPersonByIdRMQConfig().exchange,
      routingKey: getPersonByIdRMQConfig().routingKey,
      payload: person_id,
    });
    //return {'ok': 200};
  }

}