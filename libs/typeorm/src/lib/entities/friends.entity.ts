import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('Friends')
export class FriendsEntity{
  @PrimaryGeneratedColumn()
  friend_id: string

  @ManyToOne(()=>UsersEntity, user=>user.friends)
  @JoinColumn({name:'user_id'})
  user: UsersEntity

  @Column()
  friend: number
}
