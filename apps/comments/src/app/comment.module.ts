import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import {CommentCommand} from "./controllers/comment.command";
import {CommentQuery} from "./controllers/comment.query";
import {CommentEvent} from "./controllers/comment.event";

@Module({
  imports: [],
  controllers: [CommentCommand, CommentQuery, CommentEvent],
  providers: [CommentService],
})
export class CommentModule {}
