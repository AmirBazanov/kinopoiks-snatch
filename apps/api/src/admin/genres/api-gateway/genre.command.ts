import {Body, Controller, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {CreateGenreDto} from '../../../genres/dtos/create-genre.dto';
import {createGenreRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BAD_REQUEST} from "@kinopoisk-snitch/constants";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@Controller('admin/genres')
@ApiTags('Admin')
export class GenreCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createGenre')
  @ApiOperation({ summary: 'Create Genre' })
  @ApiBody({ type: CreateGenreDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateGenreDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: BAD_REQUEST })
  async createMovie(@Body() genreDto: CreateGenreDto) {
    try {
      await this.amqpConnection.publish(
        createGenreRMQConfig().exchange,
        createGenreRMQConfig().routingKey,
        genreDto,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
