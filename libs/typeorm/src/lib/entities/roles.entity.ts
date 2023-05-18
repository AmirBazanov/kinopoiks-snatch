import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MoviesPersonsRolesEntity } from './movies-persons-roles.entity';

@Entity('Roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  is_eng: boolean;

  @OneToMany(() => MoviesPersonsRolesEntity, (moviesPersonsRole) => moviesPersonsRole.role)
  moviesPersonsRole: MoviesPersonsRolesEntity[];
}
