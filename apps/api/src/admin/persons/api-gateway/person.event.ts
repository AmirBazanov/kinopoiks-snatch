import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {CreatePersonDto} from "../dtos/create-person.dto";
import {UpdatePersonContract} from "@kinopoisk-snitch/contracts";
import {deletePersonRMQConfig, removeRoleRMQConfig, updatePersonRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@Controller('admin/persons')
export class PersonsEvent {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Put('/update/:id')
  async updatePerson(@Param('id') person_id: number,
                     @Body() personDto: CreatePersonDto) {
    if (isNaN(Number(person_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<UpdatePersonContract.Response>({
        exchange: updatePersonRMQConfig().exchange,
        routingKey: updatePersonRMQConfig().routingKey,
        payload: {person_id, ...personDto},
      });
    }
  }

  @Delete('/delete/:id')
  async deletePerson(@Param('id') person_id: number) {
    if (isNaN(Number(person_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request({
        exchange: deletePersonRMQConfig().exchange,
        routingKey: deletePersonRMQConfig().routingKey,
        payload: person_id,
      });
    }
  }

  @Delete('/removeRole/:id')
  async deleteRole(@Param('id') role_id: number) {
    if (isNaN(Number(role_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request({
        exchange: removeRoleRMQConfig().exchange,
        routingKey: removeRoleRMQConfig().routingKey,
        payload: role_id,
      });
    }
  }
}
