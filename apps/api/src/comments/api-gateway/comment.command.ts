import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('/reviews')
export class CommentCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createComment')
  async createComment(@Body() commentInfo: CreateCommentDto) {
    try {
      const response = await this.amqpConnection.request({
        exchange: 'PostCommentsExchange',
        routingKey: 'create-comment',
        payload: commentInfo,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('/createOnComment/:comment_id')
  async createOnComment(
    @Body() commentInfo: CreateCommentDto,
    @Param('comment_id') comment_id: string
  ) {
    commentInfo.comment_id = Number(comment_id);
    try {
      const response = await this.amqpConnection.request({
        exchange: 'PostCommentsExchange',
        routingKey: 'create-comment-on-comment',
        payload: commentInfo,
      });
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
        'PostCommentsExchange',
        'inc-like-comment',
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
        'PostCommentsExchange',
        'inc-dis-comment',
        comment_id
      );
    }
  }
}
