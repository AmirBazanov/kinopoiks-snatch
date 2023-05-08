import {Body, Controller, Get} from '@nestjs/common';
import {UserRepository} from "../repositpries/user.repository";
import {CreateUserDto} from "../dtos/create.user.dto";

@Controller()
export class UserQuery {
  constructor(private readonly userRespository: UserRepository) {}

}
