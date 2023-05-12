import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AwardsEntity } from './awards.entity';
import { RolesEntity } from './roles.entity';
import { MoviesEntity } from './movies.entity';

@Entity('Persons')
@Unique(['name', 'sur_name', 'date_birth', 'place_birth'])
export class PersonsEntity {
  @PrimaryGeneratedColumn()
  person_id: number;

  @Column()
  name: string;

  @Column()
  sur_name: string;

  @Column('int2')
  height: number;

  @Column('date')
  date_birth: Date;

  @Column()
  place_birth: string;

  @Column()
  spouse: string;

  @Column()
  photo: string;

  @Column({ default: false })
  is_eng: boolean;

  @OneToMany(() => AwardsEntity, (award) => award.person)
  @JoinTable()
  awards: AwardsEntity[];

  @ManyToMany(() => RolesEntity, (role) => role.persons)
  @JoinTable()
  roles: RolesEntity[];

  @ManyToMany(() => MoviesEntity, (movie) => movie.persons)
  @JoinTable()
  movies: MoviesEntity[];
}
