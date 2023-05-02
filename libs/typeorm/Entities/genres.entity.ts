import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {MoviesEntity} from "./movies.entity";

@Entity()
export class GenresEntity{
  @PrimaryGeneratedColumn()
  genre_id: number
  @Column({nullable: false})
  name_ru: string
  @Column({nullable: false})
  name_eng: string

  @ManyToMany(()=> MoviesEntity, movie=>movie.movie_id)
  movies_id: MoviesEntity[]
}
