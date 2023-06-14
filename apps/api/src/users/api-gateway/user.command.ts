import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EditUserDto } from '../dtos/edit-user.dto';
import {
  createUserRMQConfig,
  deleteUserRMQConfig,
  editTokenRMQConfig,
  editUserRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { EditTokenDto } from '../dtos/edit-token.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserContract } from '@kinopoisk-snitch/contracts';
import { Response } from 'express';

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

  @Put('/editUser')
  @ApiOperation({ summary: 'Edit user info' })
  @ApiBody({ type: EditUserDto })
  async editUser(@Body() editUserDto: EditUserDto, @Req() req: Request) {
    try {
      const token = req.headers['authorization'].replace('Bearer ', '');
      editUserDto.user_id = token;
      await this.amqpConnection.publish(
        editUserRMQConfig().exchange,
        editUserRMQConfig().routingKey,
        editUserDto
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('/refresh_token/:id')
  @ApiOperation({ summary: 'Edit user refresh_token by id in param' })
  @ApiBody({ type: EditTokenDto })
  async editToken(
    @Param('id', ParseIntPipe) user_id: EditTokenDto,
    @Body() new_token: string
  ) {
    try {
      await this.amqpConnection.publish(
        editTokenRMQConfig().exchange,
        editTokenRMQConfig().routingKey,
        { user_id: user_id, new_token }
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Delete('/deleteUser/:id')
  @ApiOperation({ summary: 'Delete user by id in param' })
  async deleteUser(@Param('id') id: string) {
    try {
      await this.amqpConnection.publish(
        deleteUserRMQConfig().exchange,
        deleteUserRMQConfig().routingKey,
        id
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
