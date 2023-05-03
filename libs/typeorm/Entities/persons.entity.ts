import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('Persons')
export class PersonsEntity{
  @PrimaryGeneratedColumn()
  person_id: number

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  height: number;

  @Column({ nullable: true })
  date_birth: Date;

  @Column({ nullable: true })
  place_birth: string;

  @Column({ nullable: true })
  spouse: string;

  @Column({ nullable: false })
  photo_link: string;

  @OneToMany(() => AwardsAndPrizesEntity, awardsAndPrize => awardsAndPrize.person_id)
  awardsAndPrizesEntity: AwardsAndPrizesEntity[]

  @OneToMany(() => MoviesPersonsRolesEntity, moviesPersonsRole => moviesPersonsRole.person_id)
  moviesPersonsRoles: MoviesPersonsRolesEntity[]
}
