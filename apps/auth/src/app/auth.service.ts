import { Injectable, NotFoundException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserContract,
  EmailUserContract,
  JwtPayload,
} from '@kinopoisk-snitch/contracts';
import {
  createUserRMQConfig,
  getUserByEmailRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly amqpService: AmqpConnection,
    private readonly jwtService: JwtService
  ) {}

  singJwt(user) {
    const payload: JwtPayload = {
      email: user.email,
      user_id: user.user_id,
      is_admin: user.is_admin,
    };
    const access_token = this.jwtService.sign(payload);
    return { access_token: access_token };
  }

  async singIn(email: string, password: string) {
    const user = await this.amqpService.request<EmailUserContract.Response>({
      ...getUserByEmailRMQConfig(),
      payload: { email: email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.singJwt(user);
    }
    return new NotFoundException('user');
  }

  async register(userDto: CreateUserContract.Request) {
    return this.amqpService.request<CreateUserContract.Response>({
      ...createUserRMQConfig(),
      payload: userDto,
    });
  }

  async googleAuth(userGoogle) {
    const user = await this.amqpService.request<EmailUserContract.Response>({
      ...getUserByEmailRMQConfig(),
      payload: { email: userGoogle.email },
    });
    if (user) {
      return this.singJwt(user);
    }
    return this.amqpService.request<CreateUserContract.Response>({
      routingKey: createUserRMQConfig().routingKey,
      exchange: createUserRMQConfig().exchange,
      payload: userGoogle,
    });
  }

  async vkAuth(userVk) {
    const user = await this.amqpService.request<EmailUserContract.Response>({
      ...getUserByEmailRMQConfig(),
      payload: { email: userVk.email },
    });
    if (user) {
      return this.singJwt(user);
    }
    return this.amqpService.request<CreateUserContract.Response>({
      ...createUserRMQConfig(),
      payload: userVk,
    });
  }
}
