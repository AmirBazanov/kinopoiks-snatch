import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateCommentDto} from "../dtos/create.comment.dto";


@Injectable()
export class CommentRepository {
  constructor(@InjectRepository(Comment) private readonly CommentModel: Repository<Comment>) {}

  async createComment(comment: CreateCommentDto) {
    const newComment = await this.CommentModel.create({
      ...comment,
      createdAt: new Date()
    });
    return newComment;
  }

  async findCommentById(commentId) {
    return await this.CommentModel.findOne({id: commentId});
  }
}
