import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CommentsEntity } from "./comments.entity";
import { FriendsEntity } from "./friends.entity";
import { UserMoviesInfoEntity } from "./user-movies-info.entity";

@Entity('Users')
export class UsersEntity{
  @PrimaryGeneratedColumn()
  user_id: number

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @Column()
  user_name: string

  @Column()
  community: string

  @Column()
  birthday: Date

  @Column()
  gender: string

  @Column()
  quote:string

  @Column()
  is_admin: boolean

  @Column()
  refresh_token: string

  @OneToMany(()=>CommentsEntity, comment=>comment.user)
  @JoinTable()
  comments: CommentsEntity[]

  @OneToMany(()=>FriendsEntity, friend=>friend.user)
  @JoinTable()
  friends: FriendsEntity[]

  @OneToOne(()=>UserMoviesInfoEntity, usermovie=>usermovie.user)
  @JoinColumn({name:"user_movie_info_id"})
  user_movies_info: UserMoviesInfoEntity

  @Column()
  is_eng: boolean
}
