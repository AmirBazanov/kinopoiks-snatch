import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {AwardsEntity} from "./awards.entity";

import {JoinTable} from "typeorm";
import {RolesEntity} from "./roles.entity";

@Entity('Persons')
export class PersonsEntity{
  @PrimaryGeneratedColumn()
  person_id: number

  @Column()
  name: string

  @Column()
  sur_name: string

  @Column('int2')
  height: number

  @Column('date')
  date_birth: Date

  @Column()
  place_birth: string

  @Column()
  spouse: string

  @Column()
  photo: string

  @OneToMany(()=>AwardsEntity, award=>award.person)
  @JoinTable()
  awards: AwardsEntity[]

  @ManyToMany(()=>RolesEntity, role=>role.persons)
  @JoinTable()
  roles: RolesEntity[]

  @Column()
  is_eng: boolean
}
