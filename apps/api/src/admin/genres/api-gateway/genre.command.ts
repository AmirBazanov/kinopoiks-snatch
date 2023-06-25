import {Body, Controller, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateGenreDto } from '../../../genres/dtos/create-genre.dto';
import {createGenreRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@Controller('admin/genres')
export class GenreCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createGenre')
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
