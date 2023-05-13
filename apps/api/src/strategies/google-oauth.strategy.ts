import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/user.birthday.read',
      ],
    });
  }
  и;
  async validate(_accessToken, _refreshToken, profile, done: VerifyCallback) {
    const { id, name, emails } = profile;
    const user = {
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName}${name.familyName}`,
    };

    //TODO Google auth error handler
    done(null, user);
  }
}
