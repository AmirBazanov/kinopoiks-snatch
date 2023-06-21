import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { UserService } from '../services/user.service';
import { Payload } from '@nestjs/microservices';
import { EmailUserContract, IdUserContract } from '@kinopoisk-snitch/contracts';
import {
  getUserByEmailRMQConfig,
  getUserRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class UserQuery {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly userService: UserService
  ) {}

  @RabbitRPC(getUserRMQConfig())
  async getUserById(@Payload() user_id: IdUserContract.Request) {
    return await this.userService.getUserById(user_id);
  }

  @RabbitRPC(getUserByEmailRMQConfig())
  async getUserByEmail(@Payload() email: EmailUserContract.Request) {
    return this.userService.getUserByEmail(email.email);
  }
}
