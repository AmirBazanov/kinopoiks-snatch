import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Params, Profile, Strategy, VerifyCallback } from 'passport-vkontakte';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VKStrategy extends PassportStrategy(Strategy, 'vkontakte') {
  constructor(private readonly configService: ConfigService) {
    super(
      {
        clientID: configService.get('VK_CLIENT_ID'),
        clientSecret: configService.get('VK_SECRET'),
        callbackURL: configService.get('VK_REDIRECT_URI'),
        scope: ['profile', 'email'],
      },
      function (
        accessToken: string,
        refreshToken: string,
        params: Params,
        profile: Profile,
        done: VerifyCallback
      ) {
        const { id, name, gender, emails } = profile;
        done(null, {
          providerId: id,
          gender: gender,
          email: emails[0].value,
          name: `${name.givenName}${name.familyName}`,
        });
      }
    );
  }
}
