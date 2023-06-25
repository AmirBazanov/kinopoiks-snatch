import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {CreateMovieDto} from "../dtos/create-movie.dto";
import {DeleteMovieContract, UpdateMovieContract} from "@kinopoisk-snitch/contracts";
import {deleteMovieRMQConfig, updateMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@ApiTags('Admin')
@Controller('admin/movies')
export class MovieEvent {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Put('/update/:id')
  @ApiOperation({ summary: 'Edit Movie' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  async updateMovie(@Param('id') movie_id: number,
                    @Body() movieDto: CreateMovieDto) {
    if (isNaN(Number(movie_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<UpdateMovieContract.Response>({
        exchange: updateMovieRMQConfig().exchange,
        routingKey: updateMovieRMQConfig().routingKey,
        payload: {movie_id, ...movieDto},
      });
    }
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete Movie' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  async deleteMovie(@Param('id') movie_id: number) {
    if (isNaN(Number(movie_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<DeleteMovieContract.Response>({
        exchange: deleteMovieRMQConfig().exchange,
        routingKey: deleteMovieRMQConfig().routingKey,
        payload: movie_id,
      });
    }
  }
}
