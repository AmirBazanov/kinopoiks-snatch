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
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@ApiTags('Admin')
@Controller('admin/users')
export class UserCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Put('/editUser')
  @ApiOperation({ summary: 'Edit User' })
  @ApiBody({ type: EditUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: EditUserDto
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
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
  @ApiOperation({ summary: 'Edit User`s refresh_toke' })
  @ApiBody({ type: EditTokenDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
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
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
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
