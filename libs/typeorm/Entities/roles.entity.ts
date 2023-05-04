import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { MoviesPersonsRolesEntity } from "./movies-persons-roles.entity";

@Entity('Roles')
export class RolesEntity{
  @PrimaryGeneratedColumn()
  role_id: number

  @Column("text", { nullable: false })
  name: string;

  @Column("text", { nullable: false })
  name_eng: string;

  @OneToMany(() => MoviesPersonsRolesEntity, moviesPersonsRole => moviesPersonsRole.role_id)
  moviesPersonsRoles: MoviesPersonsRolesEntity[]
}
