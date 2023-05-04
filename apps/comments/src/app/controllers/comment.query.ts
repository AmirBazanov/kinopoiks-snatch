import { Controller, Get } from '@nestjs/common';
import {CommentRepository} from "../repositories/comment.repository.st";

@Controller()
export class CommentQuery {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getComment(id: number) {
    const comment = this.commentRepository.findCommentById(id);
    return comment;
  }

}
