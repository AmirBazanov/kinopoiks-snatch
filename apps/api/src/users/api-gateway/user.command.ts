import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UsePipes,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EditUserDto } from '../dtos/edit-user.dto';
import {
  createUserRMQConfig,
  deleteUserRMQConfig,
  editUserRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller('/users')
export class UserCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createUser')
  async createUser(@Body() userDto: CreateUserDto) {
    try {
      await this.amqpConnection.publish(
        createUserRMQConfig().exchange,
        createUserRMQConfig().routingKey,
        userDto
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('/editUser')
  async editUser(@Body() editUserDto: EditUserDto, @Req() req: Request) {
    try {
      const token = req.headers['authorization'].replace('Bearer ', '');
      editUserDto.user_id = token;
      await this.amqpConnection.publish(
        editUserRMQConfig().exchange,
        editUserRMQConfig().routingKey,
        editUserDto
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Delete('/deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.amqpConnection.publish(
        deleteUserRMQConfig().exchange,
        deleteUserRMQConfig().routingKey,
        id
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
