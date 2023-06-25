import {Body, Controller, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {CreatePersonDto} from "../dtos/create-person.dto";
import {addRoleRMQConfig, createPersonRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AddRoleDto} from "../dtos/add-role.dto";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BAD_REQUEST} from "@kinopoisk-snitch/constants";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@ApiTags('Admin')
@Controller('admin/persons')
export class PersonsCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createPerson')
  @ApiOperation({ summary: 'Create Person' })
  @ApiBody({ type: CreatePersonDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreatePersonDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: BAD_REQUEST })
  async createPerson(@Body() createPersonDTO: CreatePersonDto) {
    try {
      await this.amqpConnection.publish(
        createPersonRMQConfig().exchange,
        createPersonRMQConfig().routingKey,
        createPersonDTO,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
  @Post('/addRole')
  @ApiOperation({ summary: 'Create Role' })
  @ApiBody({ type: AddRoleDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: AddRoleDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: BAD_REQUEST })
  async addRole(@Body() addRoleDto: AddRoleDto) {
    try {
      await this.amqpConnection.publish(
        addRoleRMQConfig().exchange,
        addRoleRMQConfig().routingKey,
        addRoleDto,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
