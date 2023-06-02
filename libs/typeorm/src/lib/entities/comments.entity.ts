import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { MoviesEntity } from './movies.entity';
import { UsersEntity } from './users.entity';

@Entity('Comments')
@Tree('closure-table')
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

  @TreeChildren()
  children: CommentsEntity[];

  @TreeParent()
  parent: CommentsEntity;

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
