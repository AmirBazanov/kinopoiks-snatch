import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommentModule } from './app/comment.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentModule);
  await app.init();
  Logger.log(`🚀 Application comments is running`);
}

bootstrap();
