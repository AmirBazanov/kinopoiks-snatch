import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '@kinopoisk-snitch/typeorm';
import { CreateCommentContract } from '@kinopoisk-snitch/contracts';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly CommentModel: Repository<CommentsEntity>
  ) {}

  async createComment(commentInfo: CreateCommentContract.Request) {
    const temp = this.CommentModel.create({
      ...commentInfo,
      likes: 0,
      dislikes: 0,
      replied_comment: 0,
      created_at: new Date(),
    });
    await this.CommentModel.save(temp);
  }
}
