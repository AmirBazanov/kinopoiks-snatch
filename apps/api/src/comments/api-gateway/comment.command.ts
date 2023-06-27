import {Body, Controller, HttpStatus, Param, ParseIntPipe, Post, Req, UsePipes,} from '@nestjs/common';
import {CreateCommentDto} from '../dtos/create-comment.dto';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {
  createCommentOnCommentRMQConfig,
  createCommentRMQConfig,
  incDisCommentRMQConfig,
  incLikeCommentRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('CommentCommand')
@Controller('/reviews')
export class CommentCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/film/:id')
  @ApiOperation({ summary: 'Create comment' })
  @ApiBody({ type: CreateCommentDto })
  async createComment(
    @Body() commentInfo: CreateCommentDto,
    @Param('id', ParseIntPipe) movie_id: string,
    @Req() req: Request
  ) {
    commentInfo.user_id = req.headers['authorization'].replace('Bearer ', '');
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
  @ApiOperation({ summary: 'Create comment on comment by id in param' })
  @ApiBody({ type: CreateCommentDto })
  async createOnComment(
    @Body() commentInfo: CreateCommentDto,
    @Param('comment_id', ParseIntPipe) comment_id: string,
    @Req() req: Request
  ) {
    commentInfo.comment_id = Number(comment_id);
    commentInfo.user_id = req.headers['authorization'].replace('Bearer ', '');
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
  @ApiOperation({ summary: 'Put a like by comment id in param' })
  async incLikes(@Param('id') comment_id: string) {
    await this.amqpConnection.publish(
      incLikeCommentRMQConfig().exchange,
      incLikeCommentRMQConfig().routingKey,
      comment_id
    );
  }

  @UsePipes(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @Post('/incDis/:id')
  @ApiOperation({ summary: 'Put a dislike by comment id in param' })
  async incDis(@Param('id') comment_id: string) {
    await this.amqpConnection.publish(
      incDisCommentRMQConfig().exchange,
      incDisCommentRMQConfig().routingKey,
      comment_id
    );
  }
}
