import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import {PersonsEntity} from "./persons.entity";

@Entity('Roles')
export class RolesEntity{
  @PrimaryGeneratedColumn()
  role_id: number

  @Column()
  name: string

  @ManyToMany(()=>PersonsEntity, person=>person.roles)
  persons: PersonsEntity[]

  @Column()
  is_eng: boolean
}
