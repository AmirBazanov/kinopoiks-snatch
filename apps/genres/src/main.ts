/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GenresModule } from './app/genres.module';

async function bootstrap() {
  const app = await NestFactory.create(GenresModule);
  await app.init();
  Logger.log(
    `🚀 Genres application is running`
  );
}

bootstrap();
