import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EmailUserContract, IdUserContract } from '@kinopoisk-snitch/contracts';
import {
  getUserByEmailRMQConfig,
  getUserRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailUserDto } from '../dtos/email-user.dto';

@ApiTags('UserQuery')
@Controller('/users')
export class UserQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Get('/getUser/:id')
  @ApiOperation({ summary: 'Get user by id in param' })
  async getUserById(@Param('id') user_id: string) {
    const user = await this.amqpConnection.request<IdUserContract.Response>({
      ...getUserRMQConfig(),
      payload: user_id,
    });
    return user;
  }

  @Get('/getUserByEmail')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiBody({ type: EmailUserDto })
  async getUserByEmail(@Body() user_email: EmailUserDto) {
    const user = await this.amqpConnection.request<EmailUserContract.Response>({
      ...getUserByEmailRMQConfig(),
      payload: user_email,
    });
    return user;
  }
}
