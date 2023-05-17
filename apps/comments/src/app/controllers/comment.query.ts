import { Controller } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  getByFilmIdCommentsRMQConfig,
  getByIdCommentRMQConfig,
  getByUserIdCommentsRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { Payload } from '@nestjs/microservices';

@Controller()
export class CommentQuery {
  constructor(private readonly commentService: CommentService) {}

  @RabbitRPC(getByIdCommentRMQConfig())
  async getCommentById(@Payload() comment_id: number) {
    const comment = await this.commentService.getCommentById(comment_id);
    return comment;
  }

  @RabbitRPC(getByFilmIdCommentsRMQConfig())
  async getCommentsByFilmId(@Payload() film_id: number) {
    const comments = await this.commentService.getCommentsByFilmId(film_id);
    return comments;
  }

  @RabbitRPC(getByUserIdCommentsRMQConfig())
  async getCommentByUserId(@Payload() user_id: number) {
    const comments = await this.commentService.getCommentsByUserId(user_id);
    return comments;
  }
}
