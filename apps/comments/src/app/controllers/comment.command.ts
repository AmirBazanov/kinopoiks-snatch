import {Body, Controller, Get} from '@nestjs/common';
import {CommentService} from "../services/comment.service";
import {CreateCommentDto} from "../dtos/create.comment.dto";

@Controller()
export class CommentCommand {
  constructor(private readonly commentService: CommentService) {}

  //какие-то настройки rmq
  async createComment(@Body() commentDto: CreateCommentDto) {
    const comment = await this.commentService.createComment(commentDto);
    return comment
  }
}
