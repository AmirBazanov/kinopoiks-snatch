import { Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import {
  CreateCommentContract,
  CreateCommentOnCommentContract,
} from '@kinopoisk-snitch/contracts';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentRepository)
    private readonly commentRepository: CommentRepository,
    private jwtService: JwtService
  ) {}

  async createComment(commentInfo: CreateCommentContract.Request) {
    const user = this.jwtService.verify(commentInfo.user_id, {
      secret: process.env.JWT_SECRET,
    });
    const user_id = Number(user['user_id']);
    const move_id = Number(commentInfo['movie_id']);
    await this.commentRepository.createComment(commentInfo, move_id, user_id);
  }

  async createOnComment(commentInfo: CreateCommentOnCommentContract.Request) {
    const user = this.jwtService.verify(commentInfo.user_id, {
      secret: process.env.JWT_SECRET,
    });
    const user_id = Number(user['user_id']);
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
