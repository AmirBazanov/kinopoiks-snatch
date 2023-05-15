import { Module } from '@nestjs/common';
import { CommentsEntity, TypeormModuleConfig } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqCommentConfig } from './configs/amqp.comment.config';
import { CommentCommand } from './api-gateway/comment.command';
import { CommentQuery } from './api-gateway/comment.query';
import { CommentEvent } from './api-gateway/comment.event';

@Module({
  imports: [
    TypeormModuleConfig,
    TypeOrmModule.forFeature([CommentsEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqCommentConfig()),
  ],
  controllers: [CommentCommand, CommentQuery, CommentEvent],
})
export class CommentsModule {}
