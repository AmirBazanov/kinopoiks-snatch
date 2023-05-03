import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata"

import {PersonsEntity} from "./persons.entity";

@Entity('Roles')
export class RolesEntity{
  @PrimaryGeneratedColumn()
  role_id: number

  @Column()
  name_ru: string

  @Column()
  name_eng: string

  @ManyToMany(()=>PersonsEntity, person=>person.person_id)
  @Column()
  persons: PersonsEntity[]
}
