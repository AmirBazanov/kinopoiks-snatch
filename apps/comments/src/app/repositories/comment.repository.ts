import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CommentsEntity } from '@kinopoisk-snitch/typeorm';
import {
  CreateCommentContract,
  CreateCommentOnCommentContract,
} from '@kinopoisk-snitch/contracts';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly CommentModel: TreeRepository<CommentsEntity>
  ) {}

  async createComment(
    commentInfo: CreateCommentContract.Request,
    movie_id: number,
    user_id: number
  ) {
    const comment = await this.CommentModel.create({
      ...commentInfo,
      movie: {
        movie_id: movie_id,
      },
      user: {
        user_id: user_id,
      },
      created_at: new Date(),
    });
    await this.CommentModel.save(comment);
  }

  async createOnComment(
    commentInfo: CreateCommentOnCommentContract.Request,
    user_id: number
  ) {
    const comment_id_for_reply = commentInfo.comment_id;
    delete commentInfo.comment_id;
    const comment = await this.CommentModel.create({
      ...commentInfo,
      parent: {
        comment_id: comment_id_for_reply,
      },
      movie: {
        movie_id: 123,
      },
      user: {
        user_id: user_id,
      },
      created_at: new Date(),
    });
    await this.CommentModel.save(comment);
  }

  async getCommentById(comment_id: number) {
    const comments = await this.CommentModel.findOne({
      where: {
        comment_id: comment_id,
      },
    });
    const childrenTree = await this.CommentModel.findDescendantsTree(comments);
    return childrenTree;
  }

  async getCommentsByUserId(id: number) {
    const comments = await this.CommentModel.find({
      where: {
        user: {
          user_id: id,
        },
      },
    });
    return comments;
  }

  async getCommentByFilmId(id: number) {
    const comments = await this.CommentModel.find({
      where: {
        movie: {
          movie_id: id,
        },
      },
    });
    return comments;
  }

  async incLikes(id: number) {
    const comment = await this.CommentModel.findOne({
      where: {
        comment_id: id,
      },
    });
    comment.likes = comment.likes + 1;
    await this.CommentModel.save(comment);
  }

  async incDis(id: number) {
    const comment = await this.CommentModel.findOne({
      where: {
        comment_id: id,
      },
    });
    comment.dislikes = comment.dislikes + 1;
    await this.CommentModel.save(comment);
  }
}
