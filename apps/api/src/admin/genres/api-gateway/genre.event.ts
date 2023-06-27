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
import {UpdateGenreContract} from "@kinopoisk-snitch/contracts";
import {deleteGenreRMQConfig, updateGenreRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateGenreDto} from "../dtos/create-genre.dto";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@ApiTags('Admin')
@Controller('admin/genres')
export class GenreEvent {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Put('/update/:id')
  @ApiOperation({ summary: 'Edit Genre' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Genre not found' })
  async updateGenre(@Param('id') genre_id: number,
                    @Body() genreDto: CreateGenreDto) {
    if (isNaN(Number(genre_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<UpdateGenreContract.Response>({
        exchange: updateGenreRMQConfig().exchange,
        routingKey: updateGenreRMQConfig().routingKey,
        payload: {genre_id, ...genreDto},
      });
    }
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete Genre' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Genre not found' })
  async deleteGenre(@Param('id') genre_id: number) {
    if (isNaN(Number(genre_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request({
        exchange: deleteGenreRMQConfig().exchange,
        routingKey: deleteGenreRMQConfig().routingKey,
        payload: genre_id,
      });
    }
  }
}
