import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata"
import {MoviesEntity} from "./movies.entity";
import {PersonsEntity} from "./persons.entity";

@Entity('Awards')
export class AwardsEntity{
  @PrimaryGeneratedColumn()
  award_id: number

  @Column()
  name: string

  @Column('year')
  year: Date

  @Column()
  nomination: string

  @ManyToOne(()=>PersonsEntity, person=>person.person_id)
  @Column()
  person: PersonsEntity

  @ManyToOne(()=> MoviesEntity, movie=>movie.movie_id)
  @Column()
  movie: MoviesEntity
}
