import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import { CreateUserContract } from '@kinopoisk-snitch/contracts';

@Controller()
export class UserCommand {
  constructor(
    private readonly userService: UserService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @RabbitRPC({
    exchange: 'PostUsersExchange',
    routingKey: 'create-user',
    queue: 'queue1',
  })
  async createUser(@Payload() userDto: CreateUserContract.Request) {
    console.log('Пришло');
    console.log(userDto);
    const newUser = await this.userService.createUser(userDto);
    await this.amqpConnection.publish(
      'GetUsersExchange',
      'get-user',
      newUser['user_id']
    );
    return newUser;
  }
}
