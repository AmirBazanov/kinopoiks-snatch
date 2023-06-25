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
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@ApiTags('Admin')
@Controller('admin/persons')
export class PersonsEvent {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Put('/update/:id')
  @ApiOperation({ summary: 'Update Person' })
  @ApiBody({ type: CreatePersonDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: CreatePersonDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Person not found" })
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
  @ApiOperation({ summary: 'Delete Peron' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Person not found' })
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
  @ApiOperation({ summary: 'Delete Role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found' })
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
