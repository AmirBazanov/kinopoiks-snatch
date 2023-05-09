import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateUserDto } from '../dtos/create.user.dto';

@Controller()
export class UserGatewayCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createUser')
  async createUser(@Body() userDto: CreateUserDto) {
    const response = await this.amqpConnection.request({
      exchange: 'UsersExchange',
      routingKey: 'create-user',
      payload: userDto,
    });
    console.log('msg publish');
    console.log(response);
  }
}
