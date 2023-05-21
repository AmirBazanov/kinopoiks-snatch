import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoviesEntity } from './movies.entity';

@Entity('Genres')
export class GenresEntity {
  @PrimaryGeneratedColumn()
  genre_id: number;
  
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ default: false })
  is_eng: boolean;
}
