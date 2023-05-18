import { Injectable, NotFoundException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { JwtService } from '@nestjs/jwt';
import { EmailUserContract, JwtPayload } from '@kinopoisk-snitch/contracts';
import { getUserByEmailRMQConfig } from '@kinopoisk-snitch/rmq-configs';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly amqpService: AmqpConnection,
    private readonly jwtService: JwtService
  ) {}

  async singIn(email: string, password: string) {
    const user = await this.amqpService.request<EmailUserContract.Response>({
      ...getUserByEmailRMQConfig(),
      payload: { email: email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        email: user.email,
        user_id: user.user_id,
        is_admin: user.is_admin,
      };
      const access_token = this.jwtService.sign(payload);
      return { access_token: access_token };
    }
    return new NotFoundException('user');
  }
}
