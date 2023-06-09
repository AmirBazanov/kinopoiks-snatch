import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  getByFilmIdCommentsRMQConfig,
  getByIdCommentRMQConfig,
  getByUserIdCommentsRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller('/reviews')
export class CommentQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Get('/getCommentById/:id')
  async getCommentById(@Param('id') comment_id: string) {
    const comment = await this.amqpConnection.request({
      ...getByIdCommentRMQConfig(),
      payload: comment_id,
    });
    return comment;
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Get('/byFilmId/:id')
  async getCommentsByFilmId(@Param('id') film_id: string) {
    const comments = await this.amqpConnection.request({
      ...getByFilmIdCommentsRMQConfig(),
      payload: film_id,
    });
    return comments;
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Get('/byUserId/:id')
  async getCommentsByUserId(@Param('id') user_id: string) {
    const comments = await this.amqpConnection.request({
      ...getByUserIdCommentsRMQConfig(),
      payload: user_id,
    });
    return comments;
  }
}
