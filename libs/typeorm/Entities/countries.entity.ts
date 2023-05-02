import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MoviesEntity} from "./movies.entity";

@Entity('Countries')
export class CountriesEntity{
  @PrimaryGeneratedColumn()
  country_id: number

  @Column()
  name_ru: string;

  @Column()
  name_eng: string;

  @OneToMany(()=>MoviesEntity, movie=> movie.production_country_id)
  movies: MoviesEntity[]
}
