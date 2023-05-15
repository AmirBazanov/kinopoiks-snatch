import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '@kinopoisk-snitch/typeorm';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly CommentModel: Repository<CommentsEntity>
  ) {}
}
