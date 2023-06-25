import {Body, Controller, HttpStatus, Post, Res,} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {CreateUserDto} from '../dtos/create-user.dto';
import {createUserRMQConfig,} from '@kinopoisk-snitch/rmq-configs';
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateUserContract} from '@kinopoisk-snitch/contracts';
import {Response} from 'express';

@ApiTags('UserCommand')
@Controller('/users')
export class UserCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createUser')
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() userDto: CreateUserDto, @Res() res: Response) {
    try {
      const user =
        await this.amqpConnection.request<CreateUserContract.Response>({
          ...createUserRMQConfig(),
          payload: userDto,
        });

      if (user.error) {
        return res.status(HttpStatus.BAD_REQUEST).send(user.error['response']);
      }
    } catch (e) {
      throw new Error(e);

    }
  }

}
