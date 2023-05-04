import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import {UserCommand} from "./controllers/user.command";
import {UserQuery} from "./controllers/user.query";
import {UserEvent} from "./controllers/users.event";
import {UserRepository} from "./repositpries/user.repository";

@Module({
  imports: [],
  controllers: [UserCommand, UserQuery, UserEvent],
  providers: [UserService, UserRepository],
})
export class UserModule {}
