import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { UserService } from '../services/user.service';
import { Payload } from '@nestjs/microservices';
import { EmailUserContract } from '@kinopoisk-snitch/contracts';

@Controller()
export class UserQuery {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly userService: UserService
  ) {}

  @RabbitRPC({
    exchange: 'GetUsersExchange',
    routingKey: 'get-user',
    queue: 'queue2',
  })
  async getUserById(@Payload() user_id: number) {
    const user = this.userService.getUserById(user_id);
    return user;
  }

  @RabbitRPC({
    exchange: 'GetUsersExchange',
    routingKey: 'get-user',
    queue: 'queue2',
  })
  async getUserByEmail(@Payload() email: EmailUserContract.Request) {
    const user = this.userService.getUserByEmail(email['email']);
    return user;
  }
}
