import { Body, Controller, Post } from '@nestjs/common';
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
}
