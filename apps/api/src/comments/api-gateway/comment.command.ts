import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  createCommentOnCommentRMQConfig,
  createCommentRMQConfig,
  incDisCommentRMQConfig,
  incLikeCommentRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller('/reviews')
export class CommentCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/film/:id')
  async createComment(
    @Body() commentInfo: CreateCommentDto,
    @Param('id') movie_id: string,
    @Req() req: Request
  ) {
    const token = req.headers['authorization'].replace('Bearer ', '');
    commentInfo.user_id = token;
    commentInfo.film_id = movie_id;
    try {
      await this.amqpConnection.publish(
        createCommentRMQConfig().exchange,
        createCommentRMQConfig().routingKey,
        commentInfo
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('/createOnComment/:comment_id')
  async createOnComment(
    @Body() commentInfo: CreateCommentDto,
    @Param('comment_id') comment_id: string,
    @Req() req: Request
  ) {
    commentInfo.comment_id = Number(comment_id);
    const token = req.headers['authorization'].replace('Bearer ', '');
    commentInfo.user_id = token;
    try {
      await this.amqpConnection.publish(
        createCommentOnCommentRMQConfig().exchange,
        createCommentOnCommentRMQConfig().routingKey,
        commentInfo
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('/incLike/:id')
  async incLikes(@Param('id') comment_id: string) {
    if (isNaN(Number(comment_id))) {
      throw new HttpException(
        'ID должен состоять из цифр',
        HttpStatus.BAD_REQUEST
      );
    } else {
      await this.amqpConnection.publish(
        incLikeCommentRMQConfig().exchange,
        incLikeCommentRMQConfig().routingKey,
        comment_id
      );
    }
  }

  @Post('/incDis/:id')
  async incDis(@Param('id') comment_id: string) {
    if (isNaN(Number(comment_id))) {
      throw new HttpException(
        'ID должен состоять из цифр',
        HttpStatus.BAD_REQUEST
      );
    } else {
      await this.amqpConnection.publish(
        incDisCommentRMQConfig().exchange,
        incDisCommentRMQConfig().routingKey,
        comment_id
      );
    }
  }
}
