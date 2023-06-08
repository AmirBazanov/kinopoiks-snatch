import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  getPersonByIdRMQConfig,
  getPersonByNameRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { IdPersonContract } from '@kinopoisk-snitch/contracts';

@Controller('/persons')
export class PersonsQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getPersonById/:id')
  async getPersonById(@Param('id') person_id: IdPersonContract.Request) {
    if (isNaN(Number(person_id))) {
      throw new HttpException('ID must be a number', HttpStatus.BAD_REQUEST);
    } else {
      return await this.amqpConnection.request<IdPersonContract.Response>({
        exchange: getPersonByIdRMQConfig().exchange,
        routingKey: getPersonByIdRMQConfig().routingKey,
        payload: person_id,
      });
    }
  }

  @Get('/getPersonByName/:fullName')
  async getPersonByName(@Param('fullName') personDto: string) {
    return await this.amqpConnection.request(
      /*<NamePersonContract.Response>*/ {
        exchange: getPersonByNameRMQConfig().exchange,
        routingKey: getPersonByNameRMQConfig().routingKey,
        payload: personDto,
      }
    );
  }
}
