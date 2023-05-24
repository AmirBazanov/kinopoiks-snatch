import { Controller } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import {
  CreateCommentContract,
  CreateCommentOnCommentContract,
} from '@kinopoisk-snitch/contracts';
import {
  createCommentOnCommentRMQConfig,
  createCommentRMQConfig,
  incDisCommentRMQConfig,
  incLikeCommentRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class CommentCommand {
  constructor(private readonly commentService: CommentService) {}

  @RabbitRPC(createCommentRMQConfig())
  async createComment(@Payload() commentInfo: CreateCommentContract.Request) {
    //Брать movie_id из сервиса movies
    await this.commentService.createComment(commentInfo, 123);
  }

  @RabbitRPC(createCommentOnCommentRMQConfig())
  async createCommentOnComment(
    @Payload() commentInfo: CreateCommentOnCommentContract.Request
  ) {
    await this.commentService.createOnComment(commentInfo);
  }

  @RabbitRPC(incLikeCommentRMQConfig())
  async incLikes(@Payload() comment_id: number) {
    await this.commentService.incLikes(comment_id);
  }

  @RabbitRPC(incDisCommentRMQConfig())
  async incDis(@Payload() comment_id: number) {
    await this.commentService.incDis(comment_id);
  }
}
