import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateCommentDto} from "../dtos/create.comment.dto";
import {CommentsEntity} from "@kinopoisk-snitch/typeorm";


@Injectable()
export class CommentRepository {
  constructor(@InjectRepository(CommentsEntity) private readonly CommentModel: Repository<CommentsEntity>) {}

  async createComment(comment: CreateCommentDto) {
    const newComment = await this.CommentModel.create({
      ...comment,
      created_at: new Date()
    });
    return newComment;
  }

  async findCommentById(commentId) {
    return await this.CommentModel.findOne({id: commentId});
  }
}
