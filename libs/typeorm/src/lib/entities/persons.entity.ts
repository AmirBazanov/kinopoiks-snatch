import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AwardsEntity } from './awards.entity';
import { MoviesPersonsRolesEntity } from './movies-persons-roles.entity';

@Entity('Persons')
@Unique(['name', 'sur_name', 'date_birth', 'place_birth'])
export class PersonsEntity {
  @PrimaryGeneratedColumn()
  person_id: number;

  @Column()
  name: string;

  @Column()
  sur_name: string;

  @Column('int2', { nullable: true })
  height: number;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value.toISOString().slice(0, 10), // format the Date to YYYY-MM-DD
    },
    nullable: true,
  })
  date_birth: Date;

  @Column({ nullable: true })
  place_birth: string;

  @Column({ nullable: true })
  spouse: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ default: false })
  is_eng: boolean;

  @OneToMany(() => AwardsEntity, (award) => award.person)
  @JoinTable()
  awards: AwardsEntity[];

  @OneToMany(
    () => MoviesPersonsRolesEntity,
    (moviesPersonsRole) => moviesPersonsRole.person
  )
  moviesPersonsRole: MoviesPersonsRolesEntity[];
}
