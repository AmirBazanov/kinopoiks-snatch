import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { CommentCommand } from './api-gateway/comment.command';
import { CommentQuery } from './api-gateway/comment.query';
import { CommentEvent } from './api-gateway/comment.event';
import { rmqCommentConfig } from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqCommentConfig()),
  ],
  controllers: [CommentCommand, CommentQuery, CommentEvent],
  providers: [],
})
export class CommentsModule {}
