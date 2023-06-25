import {Body, Controller, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {CreatePersonDto} from "../dtos/create-person.dto";
import {addRoleRMQConfig, createPersonRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AddRoleDto} from "../dtos/add-role.dto";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@Controller('admin/persons')
export class PersonsCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createPerson')
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
