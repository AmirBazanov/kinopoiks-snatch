import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dtos/create.user.dto";


@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly UserModel: Repository<User>) {}

  async createUser(user: CreateUserDto) {
    const newUser = await this.UserModel.create({
      ...user,
      createdAt: new Date()
    });
    return newUser;
  }

  async findUserById(userId) {
    return await this.UserModel.findOne({id: userId});
  }
}
