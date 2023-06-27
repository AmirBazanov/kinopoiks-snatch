import {Controller, Get, HttpStatus, Param, ParseIntPipe, UsePipes,} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {
  getByFilmIdCommentsRMQConfig,
  getByIdCommentRMQConfig,
  getByUserIdCommentsRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateCommentDto} from "../dtos/create-comment.dto";

@ApiTags('CommentQuery')
@Controller('/reviews')
export class CommentQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Get('/getCommentsById/:id')
  @ApiOperation({ summary: 'Get comment by id in param' })
  @ApiResponse({type: CreateCommentDto, isArray: true})
  async getCommentById(@Param('id') comment_id: string) {
    return await this.amqpConnection.request({
      ...getByIdCommentRMQConfig(),
      payload: comment_id,
    });
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Get('/byFilmId/:id')
  @ApiOperation({ summary: 'Get comment by film id in param' })
  @ApiResponse({type: CreateCommentDto, isArray: true})
  async getCommentsByFilmId(@Param('id') film_id: string) {
    return await this.amqpConnection.request({
      ...getByFilmIdCommentsRMQConfig(),
      payload: film_id,
    });
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Get('/byUserId/:id')
  @ApiResponse({type: CreateCommentDto, isArray: true})
  @ApiOperation({ summary: 'Get comment by user id in param' })
  async getCommentsByUserId(@Param('id') user_id: string) {
    return await this.amqpConnection.request({
      ...getByUserIdCommentsRMQConfig(),
      payload: user_id,
    });
  }
}
