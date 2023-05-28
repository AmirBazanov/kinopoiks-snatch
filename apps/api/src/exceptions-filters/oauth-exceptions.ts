import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { TokenError } from 'passport-oauth2';
import { AUTH_ERROR, TOKEN_EXPIRED } from '../constants/errors-constants';

@Catch(TokenError)
export class PassportTokenErrorFilter implements ExceptionFilter {
  catch(exception: TokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof TokenExpiredError) {
      response.status(401).json({
        message: TOKEN_EXPIRED,
      });
    } else {
      // Обработка других ошибок PassportJS
      response.status(401).json({
        message: AUTH_ERROR,
      });
    }
  }
}
