import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PersonsModule } from './app/persons.module';

async function bootstrap() {
  const app = await NestFactory.create(PersonsModule)
  await app.init();
  Logger.log(
    `🚀 Application persons is running`
  );
}

bootstrap();
