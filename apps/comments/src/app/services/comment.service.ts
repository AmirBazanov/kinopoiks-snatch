import {Inject, Injectable} from '@nestjs/common';
import {CommentRepository} from "../repositories/comment.repository.st";
import {CreateCommentDto} from "../dtos/create.comment.dto";

@Injectable()
export class CommentService {

  constructor(@Inject(CommentRepository) private readonly commentRepository: CommentRepository) {}
  async createComment(commentDto: CreateCommentDto) {
    const comment = await this.commentRepository.createComment(commentDto);
    return comment;
  }
}
