import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '@kinopoisk-snitch/typeorm';
import {
  CreateCommentContract,
  CreateCommentOnCommentContract,
} from '@kinopoisk-snitch/contracts';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly CommentModel: Repository<CommentsEntity>
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
    // const commentForFilmId = await this.CommentModel.findOne({
    //   where: {
    //     comment_id: Number(commentInfo.comment_id),
    //   },
    // });
    //нужен сервис фильмов для полноценной работы
    const comment_id = commentInfo.comment_id;
    delete commentInfo.comment_id;
    const comment = await this.CommentModel.create({
      ...commentInfo,
      replied_comment: comment_id,
      movie: {
        movie_id: 1,
      },
      user: {
        user_id: user_id,
      },
      created_at: new Date(),
    });
    await this.CommentModel.save(comment);
  }

  async getCommentById(id: number) {
    const comment = await this.CommentModel.findOne({
      where: {
        comment_id: id,
      },
    });

    return comment;
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
