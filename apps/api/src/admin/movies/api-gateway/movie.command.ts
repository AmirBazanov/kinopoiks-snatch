import {Body, Controller, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {CreateMovieDto} from '../dtos/create-movie.dto';
import {createMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BAD_REQUEST} from "@kinopoisk-snitch/constants";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@ApiTags("Admin")
@Controller('admin/movies')
export class MovieCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createMovie')
  @ApiOperation({ summary: 'Create Movie' })
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateMovieDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: BAD_REQUEST })
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
