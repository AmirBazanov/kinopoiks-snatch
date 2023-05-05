import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {MoviesEntity} from "./movies.entity";

@Entity('Genres')
export class GenresEntity{
  @PrimaryGeneratedColumn()
  genre_id: number
  @Column({nullable: false})
  name: string

  @ManyToMany(()=> MoviesEntity, movie=>movie.genres)
  @JoinTable()
  movies: MoviesEntity[]

  @Column()
  is_eng: boolean
}
