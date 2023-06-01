import {Body, Controller, Delete, HttpException, HttpStatus, Param, Put} from '@nestjs/common';
import {CreateMovieDto} from "../dtos/create-movie.dto";
import {DeleteMovieContract, UpdateMovieContract} from "@kinopoisk-snitch/contracts";
import {deleteMovieRMQConfig, updateMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Controller('/movies')
export class MovieEvent {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Put('/update/:id')
  async updateMovie(@Param('id') movie_id: number,
                    @Body() movieDto: CreateMovieDto) {
    if (isNaN(Number(movie_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const movie = await this.amqpConnection.request<UpdateMovieContract.Response>({
        exchange: updateMovieRMQConfig().exchange,
        routingKey: updateMovieRMQConfig().routingKey,
        payload: {movie_id, ...movieDto},
      });
      return movie;
    }
  }

  @Delete('/delete/:id')
  async deleteMovie(@Param('id') movie_id: number) {
    if (isNaN(Number(movie_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const response = await this.amqpConnection.request<DeleteMovieContract.Response>({
        exchange: deleteMovieRMQConfig().exchange,
        routingKey: deleteMovieRMQConfig().routingKey,
        payload: movie_id,
      });
      return response;
    }
  }
}
