import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { MoviesEntity } from "./movies.entity";
import { PersonsEntity } from "./persons.entity";
import { RolesEntity } from "./roles.entity";

@Entity('MoviesPersonsRoles')
export class MoviesPersonsRolesEntity{
  @PrimaryGeneratedColumn()
  moviesPersonsRoles_id: number

  @ManyToOne(() => MoviesEntity, movie => movie.movie_id)
  @Column("int", { nullable: false })
  movie_id: number;

  @ManyToOne(() => PersonsEntity, person => person.person_id)
  @Column("int", { nullable: false })
  person_id: number;

  @ManyToOne(() => RolesEntity, role => role.role_id)
  @Column("int", { nullable: false })
  role_id: number;
}
