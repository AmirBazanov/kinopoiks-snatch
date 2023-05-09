import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import { CreateUserDto } from '../dtos/create.user.dto';

@Controller()
export class UserCommand {
  constructor(private readonly userService: UserService) {}

  @RabbitRPC({
    exchange: 'UsersExchange',
    routingKey: 'create-user',
    queue: 'queue1',
  })
  async createUser(@Payload() userDto: CreateUserDto) {
    console.log('Пришло');
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }
}
