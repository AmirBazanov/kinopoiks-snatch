import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { AwardsAndPrizesEntity } from "./awards-and-prizes.entity";
import { MoviesPersonsRolesEntity } from "./movies-persons-roles.entity";

@Entity('Persons')
export class PersonsEntity{
  @PrimaryGeneratedColumn()
  person_id: number

  @Column("text", { nullable: false })
  name: string;

  @Column("text", { nullable: false })
  surname: string;

  @Column("float8", { nullable: false })
  height: number;

  @Column("date", { nullable: true })
  date_birth: Date;

  @Column("text", { nullable: true })
  place_birth: string;

  @Column("text", { nullable: true })
  spouse: string;

  @Column("text", { nullable: false })
  photo_link: string;

  @OneToMany(() => AwardsAndPrizesEntity, awardsAndPrize => awardsAndPrize.person_id)
  awardsAndPrizes: AwardsAndPrizesEntity[]

  @OneToMany(() => MoviesPersonsRolesEntity, moviesPersonsRole => moviesPersonsRole.person_id)
  moviesPersonsRoles: MoviesPersonsRolesEntity[]
}
