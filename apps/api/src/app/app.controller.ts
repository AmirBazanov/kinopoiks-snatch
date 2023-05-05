import { Controller, Get, Inject } from "@nestjs/common";

import { AppService } from "./app.service";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "../../../../libs/typeorm/src/lib/entities/users.entity";
import { Repository } from "typeorm";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  @InjectRepository(UsersEntity) private readonly userRepository:Repository<UsersEntity> ) {}

  @Get()
  getData() {
    return this.userRepository.findAndCount();
  }
}
