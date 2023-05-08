import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dtos/create.user.dto";
import {UsersEntity} from "@kinopoisk-snitch/typeorm";


@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UsersEntity) private readonly UserModel: Repository<UsersEntity>) {}

  async createUser(userInfo: CreateUserDto) {
    // await this.UserModel.insert(userInfo);
  }
}
