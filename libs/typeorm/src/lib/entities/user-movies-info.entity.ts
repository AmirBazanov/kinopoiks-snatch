import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoviesEntity } from './movies.entity';
import { UsersEntity } from './users.entity';

@Entity('UserMoviesInfo')
export class UserMoviesInfoEntity {
  @PrimaryGeneratedColumn()
  user_movie_info_id: number;

  @ManyToMany(() => MoviesEntity)
  @JoinTable()
  favorite_movies: MoviesEntity[];

  @ManyToMany(() => MoviesEntity)
  @JoinTable()
  expecting_movies: MoviesEntity[];

  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
}
