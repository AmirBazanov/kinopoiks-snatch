import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UsePipes,
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

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
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
      console.log(commentInfo);
      await this.amqpConnection.publish(
        createCommentRMQConfig().exchange,
        createCommentRMQConfig().routingKey,
        commentInfo
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
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

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Post('/incLike/:id')
  async incLikes(@Param('id') comment_id: string) {
    await this.amqpConnection.publish(
      incLikeCommentRMQConfig().exchange,
      incLikeCommentRMQConfig().routingKey,
      comment_id
    );
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Post('/incDis/:id')
  async incDis(@Param('id') comment_id: string) {
    await this.amqpConnection.publish(
      incDisCommentRMQConfig().exchange,
      incDisCommentRMQConfig().routingKey,
      comment_id
    );
  }
}
