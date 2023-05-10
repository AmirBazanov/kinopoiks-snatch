import { Body, Controller, Get, Param } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EmailUserContract } from '@kinopoisk-snitch/contracts';

@Controller()
export class UserGatewayEvent {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getUser/:id')
  async getUserById(@Param('id') user_id: number) {
    const user = await this.amqpConnection.request({
      exchange: 'GetUsersExchange',
      routingKey: 'get-user',
      payload: user_id,
    });
    return user;
  }

  @Get('/getUserByEmail')
  async getUserByEmail(@Body() user_email: EmailUserContract.Request) {
    const user = await this.amqpConnection.request({
      exchange: 'GetUsersExchange',
      routingKey: 'get-user',
      payload: user_email,
    });
    return user;
  }
}
