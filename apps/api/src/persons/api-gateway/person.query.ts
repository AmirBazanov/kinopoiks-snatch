import { Controller, Get, Param } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { getPersonByIdRMQConfig, getPersonByNameRMQConfig } from '@kinopoisk-snitch/rmq-configs';

@Controller('/persons')
export class PersonsQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getPersonById/:id')
  async getPersonById(@Param('id') person_id: number)
  {
    return await this.amqpConnection.request({
      exchange: getPersonByIdRMQConfig().exchange,
      routingKey: getPersonByIdRMQConfig().routingKey,
      payload: person_id,
    });
  }

  @Get('/getPersonByName/:fullName')
  async getPersonByName(@Param('fullName') fullName: string)
  {
    return await this.amqpConnection.request({
      exchange: getPersonByNameRMQConfig().exchange,
      routingKey: getPersonByNameRMQConfig().routingKey,
      payload: fullName,
    });
  }
}
