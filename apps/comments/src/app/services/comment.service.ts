import { Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import {
  CreateCommentContract,
  CreateCommentOnCommentContract,
} from '@kinopoisk-snitch/contracts';

@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentRepository)
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(
    commentInfo: CreateCommentContract.Request,
    move_id: number,
    user_id: number
  ) {
    await this.commentRepository.createComment(commentInfo, move_id, user_id);
  }

  async createOnComment(
    commentInfo: CreateCommentOnCommentContract.Request,
    user_id: number
  ) {
    await this.commentRepository.createOnComment(commentInfo, user_id);
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepository.getCommentById(id);
    return comment;
  }

  async getCommentsByFilmId(id: number) {
    const comments = await this.commentRepository.getCommentByFilmId(id);
    return comments;
  }

  async getCommentsByUserId(id: number) {
    const comments = await this.commentRepository.getCommentsByUserId(id);
    return comments;
  }

  async incLikes(comment_id: number) {
    await this.commentRepository.incLikes(comment_id);
  }

  async incDis(comment_id: number) {
    await this.commentRepository.incDis(comment_id);
  }
}
