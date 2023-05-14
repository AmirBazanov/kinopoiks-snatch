import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import { CreateUserContract } from '@kinopoisk-snitch/contracts';
import { createUserRMQConfig } from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class UserCommand {
  constructor(
    private readonly userService: UserService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @RabbitRPC(createUserRMQConfig())
  async createUser(@Payload() userDto: CreateUserContract.Request) {
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }
}
