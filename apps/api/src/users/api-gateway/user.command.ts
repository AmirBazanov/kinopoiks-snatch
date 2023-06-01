import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EditUserDto } from '../dtos/edit-user.dto';

@Controller('/users')
export class UserCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createUser')
  async createUser(@Body() userDto: CreateUserDto) {
    try {
      const response = await this.amqpConnection.request({
        exchange: 'PostUsersExchange',
        routingKey: 'create-user',
        payload: userDto,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('/editUser')
  async editUser(@Body() editUserDto: EditUserDto, @Req() req: Request) {
    try {
      const token = req.headers['authorization'].replace('Bearer ', '');
      editUserDto.user_id = token;
      const response = await this.amqpConnection.request({
        exchange: 'PutUsersExchange',
        routingKey: 'edit-user',
        payload: editUserDto,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Delete('/deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      const response = await this.amqpConnection.request({
        exchange: 'DeleteUsersExchange',
        routingKey: 'delete-user',
        payload: id,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
