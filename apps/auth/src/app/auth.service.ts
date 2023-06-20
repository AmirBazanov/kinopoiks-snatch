import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserContract,
  EmailUserContract,
  JwtPayload,
} from '@kinopoisk-snitch/contracts';
import {
  createUserRMQConfig,
  editTokenRMQConfig,
  getUserByEmailRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';
import bcrypt from 'bcrypt';
import { TOKEN_EXPIRED, USER_NOT_FOUND } from '@kinopoisk-snitch/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly amqpService: AmqpConnection,
    private readonly jwtService: JwtService
  ) {}

  async singJwt(user) {
    const payload: JwtPayload = {
      email: user.email,
      user_id: user.user_id,
      is_admin: user.is_admin,
    };
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '30d' });
    await this.amqpService.request({
      ...editTokenRMQConfig(),
      payload: { token: refresh_token, user_id: user.user_id },
    });
    return { access_token: access_token, refresh_token: refresh_token };
  }

  async updateToken(refresh_token: string) {
    let jwt_payload: JwtPayload;
    try {
      jwt_payload = this.jwtService.verify<JwtPayload>(refresh_token);
    } catch (e) {
      return new BadRequestException(TOKEN_EXPIRED);
    }
    return await this.singJwt(jwt_payload);
  }

  async singIn(email: string, password: string) {
    const user = await this.amqpService.request<EmailUserContract.Response>({
      ...getUserByEmailRMQConfig(),
      payload: { email: email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.singJwt(user);
    }
    return new NotFoundException(USER_NOT_FOUND);
  }

  async register(userDto: CreateUserContract.Request) {
    const newUser = await this.amqpService.request<CreateUserContract.Response>({
      ...createUserRMQConfig(),
      payload: userDto,
    });
    if (newUser.error) {
      return newUser.error['response'];
    }
    return {...newUser, password: null, refresh_token:null}
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
