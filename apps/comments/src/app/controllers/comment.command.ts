import { Controller } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import { CreateCommentContract } from '@kinopoisk-snitch/contracts';
import { createCommentRMQConfig } from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class CommentCommand {
  constructor(private readonly commentService: CommentService) {}

  @RabbitRPC(createCommentRMQConfig())
  async createComment(@Payload() commentInfo: CreateCommentContract.Request) {
    await this.commentService.createComment(commentInfo);
  }
}
