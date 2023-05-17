import { Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CreateCommentContract } from '@kinopoisk-snitch/contracts';

@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentRepository)
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(commentInfo: CreateCommentContract.Request) {
    await this.commentRepository.createComment(commentInfo);
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepository.getCommentById(id);
    return comment;
  }
}
