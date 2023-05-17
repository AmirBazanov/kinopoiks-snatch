import { Controller } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import { getByIdCommentRMQConfig } from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class CommentEvent {
  constructor(private readonly commentService: CommentService) {}

  @RabbitRPC(getByIdCommentRMQConfig())
  async getCommentById(@Payload() comment_id: number) {
    const comment = await this.commentService.getCommentById(comment_id);
    return comment;
  }
}
