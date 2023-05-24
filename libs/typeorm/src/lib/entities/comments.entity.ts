import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoviesEntity } from './movies.entity';
import { UsersEntity } from './users.entity';

@Entity('Comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => CommentsEntity, (comment) => comment.comment_id)
  replied_comments: CommentsEntity[];

  @ManyToOne(() => MoviesEntity, (movie) => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  movie: MoviesEntity;

  @ManyToOne(() => UsersEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ default: false })
  is_eng: boolean;
}
