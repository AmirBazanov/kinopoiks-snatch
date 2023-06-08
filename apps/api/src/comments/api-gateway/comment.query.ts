import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
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

  @Get('/getCommentById/:id')
  async getCommentById(@Param('id') comment_id: string) {
    if (isNaN(Number(comment_id))) {
      throw new HttpException(
        'ID должен состоять из цифр',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const comment = await this.amqpConnection.request({
        ...getByIdCommentRMQConfig(),
        payload: comment_id,
      });
      return comment;
    }
  }

  @Get('/byFilmId/:id')
  async getCommentsByFilmId(@Param('id') film_id: string) {
    if (isNaN(Number(film_id))) {
      throw new HttpException(
        'ID должен состоять из цифр',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const comments = await this.amqpConnection.request({
        ...getByFilmIdCommentsRMQConfig(),
        payload: film_id,
      });
      return comments;
    }
  }

  @Get('/byUserId/:id')
  async getCommentsByUserId(@Param('id') user_id: string) {
    if (isNaN(Number(user_id))) {
      throw new HttpException(
        'ID должен состоять из цифр',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const comments = await this.amqpConnection.request({
        ...getByUserIdCommentsRMQConfig(),
        payload: user_id,
      });
      return comments;
    }
  }
}
