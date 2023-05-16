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

  @Column()
  likes: number;

  @Column()
  dislikes: number;

  @Column()
  replied_comment: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => MoviesEntity, (movie) => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  movie: MoviesEntity;

  @ManyToOne(() => UsersEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ default: false })
  is_eng: boolean;
}
