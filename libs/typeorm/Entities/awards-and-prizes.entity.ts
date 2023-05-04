import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { PersonsEntity } from "./persons.entity";

@Entity('AwardsAndPrizes')
export class AwardsAndPrizesEntity{
  @PrimaryGeneratedColumn()
  award_id: number

  @Column("text", { nullable: false })
  name: string;

  @Column("smallint", { nullable: false })
  year: number;

  @Column("text", { nullable: false })
  nomination: string;

  @Column("text", { nullable: false })
  name_movie: string;

  @ManyToOne(() => PersonsEntity, person => person.person_id)
  @Column("int", { nullable: false })
  person_id: number;
}
