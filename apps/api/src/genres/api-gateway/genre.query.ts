import {Body, Controller, Get, HttpException, HttpStatus, Param,} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {AllGenresContract, IdGenreContract, NameGenreContract} from '@kinopoisk-snitch/contracts';
import {getAllGenresRMQConfig, getGenreByNameRMQConfig, getGenreRMQConfig,} from "@kinopoisk-snitch/rmq-configs";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateGenreDto} from "../dtos/create-genre.dto";

@ApiTags('Genres')
@Controller('/genres')
export class GenreQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getGenre/:id')
  @ApiOperation({ summary: 'Get Genre' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateGenreDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Genre not found' })
  async getGenreById(@Param('id') genre_id: number) {
    if (isNaN(Number(genre_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<IdGenreContract.Response>({
        exchange: getGenreRMQConfig().exchange,
        routingKey: getGenreRMQConfig().routingKey,
        payload: genre_id,
      });
    }
  }

  @Get('/getGenreByName')
  @ApiOperation({ summary: 'Get Genre by name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateGenreDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Genre not found' })
  async getGenreByName(@Body() genre_name: NameGenreContract.Request) {
    return await this.amqpConnection.request<NameGenreContract.Response>({
      exchange: getGenreByNameRMQConfig().exchange,
      routingKey: getGenreByNameRMQConfig().routingKey,
      payload: genre_name,
    });
  }

  @Get('/getAllGenres')
  @ApiOperation({ summary: 'Get Genres' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateGenreDto,
    isArray: true
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Genre not found' })
  async getAllGenres() {
    return await this.amqpConnection.request<AllGenresContract.Response>({
      exchange: getAllGenresRMQConfig().exchange,
      routingKey: getAllGenresRMQConfig().routingKey,
    });
  }
}
