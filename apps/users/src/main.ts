import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserModule } from './app/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.init();
  Logger.log(
    `🚀 Application users is running`
  );
}

bootstrap();
