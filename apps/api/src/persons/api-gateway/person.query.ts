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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonsEntity } from '@kinopoisk-snitch/typeorm';

@ApiTags("Persons")
@Controller('/persons')
export class PersonsQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getPersonById/:id')
  @ApiOperation( { summary: 'Get Person by id number' } )
  @ApiParam({name: "id", type: Number, example: 1, description: "Id person"})
  @ApiResponse({status: 200, description: "Success", type: IdPersonContract.Response})
  @ApiResponse({ status: 404, description: "Not Found"})
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
  @ApiOperation( { summary: 'Get Persons by name and surname' } )
  @ApiParam({name: "fullName", type: String, example: "Майкл", description: "Полное или неполное имя person'а"})
  @ApiResponse({status: 200, description: "Success", type: PersonsEntity})
  @ApiResponse({ status: 404, description: "Not Found"})
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
