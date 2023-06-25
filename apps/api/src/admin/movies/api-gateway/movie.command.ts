import {Body, Controller, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import {createMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@Controller('admin/movies')
export class MovieCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createMovie')
  async createMovie(@Body() movieDto: CreateMovieDto) {
    try {
      await this.amqpConnection.publish(
        createMovieRMQConfig().exchange,
        createMovieRMQConfig().routingKey,
        movieDto,
    );
    } catch (e) {
      throw new Error(e);
    }
  }
}
