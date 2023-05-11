import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoviesEntity } from './movies.entity';

@Entity('Countries')
export class CountriesEntity {
  @PrimaryGeneratedColumn()
  country_id: number;

  @Column()
  name: string;

  @OneToMany(() => MoviesEntity, (movie) => movie.country)
  @JoinTable()
  movies: MoviesEntity[];

  @Column({ default: false })
  is_eng: boolean;
}
