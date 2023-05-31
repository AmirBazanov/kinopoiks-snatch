import {Body, Controller, HttpException, HttpStatus, Param, Put} from '@nestjs/common';
import {CreateMovieDto} from "../dtos/create-movie.dto";
import {IdMovieContract} from "@kinopoisk-snitch/contracts";
import {getMovieRMQConfig, updateMovieRMQConfig} from "@kinopoisk-snitch/rmq-configs";
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
      const movie = await this.amqpConnection.request<IdMovieContract.Response>({
        exchange: updateMovieRMQConfig().exchange,
        routingKey: updateMovieRMQConfig().routingKey,
        payload: {movie_id, ...movieDto},
      });
      return movie;
    }
  }
}
