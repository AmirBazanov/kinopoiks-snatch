import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {EditUserDto} from '../dtos/edit-user.dto';
import {deleteUserRMQConfig, editTokenRMQConfig, editUserRMQConfig,} from '@kinopoisk-snitch/rmq-configs';
import {EditTokenDto} from '../dtos/edit-token.dto';
import {ApiBody, ApiOperation} from '@nestjs/swagger';
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@Controller('admin/users')
export class UserCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Put('/editUser')
  @ApiOperation({ summary: 'Edit user info' })
  @ApiBody({ type: EditUserDto })
  async editUser(@Body() editUserDto: EditUserDto, @Req() req: Request) {
    try {

      editUserDto.user_id = req.headers['authorization'].replace('Bearer ', '');
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
