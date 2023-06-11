import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ADMIN_ONLY } from '@kinopoisk-snitch/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const bearer = authHeader?.split(' ')[0];
    const token = authHeader?.split(' ')[1];
    if (!bearer || !token) throw new UnauthorizedException(ADMIN_ONLY);
    const user = this.jwtService.decode(token);
    if (user) {
      return user['is_admin'];
    }
    return false;
  }
}

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      try {
        const decoded = this.jwtService.decode(token);
        req.user_id = decoded['user_id'];
        return true;
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
  }
}
