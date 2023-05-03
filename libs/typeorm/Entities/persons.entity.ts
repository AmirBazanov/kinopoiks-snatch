import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AwardsEntity} from "./awards.entity";
import "reflect-metadata"

import {JoinTable} from "typeorm/browser";
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
  spouse: string | PersonsEntity

  @Column()
  photo: string

  @OneToMany(()=>AwardsEntity, award=>award.award_id)
  @JoinTable()
  @Column()
  awards: AwardsEntity[]

  @ManyToMany(()=>RolesEntity, role=>role.role_id)
  @Column()
  @JoinTable()
  roles: RolesEntity[]
}
