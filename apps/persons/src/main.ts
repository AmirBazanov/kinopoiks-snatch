import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PersonsModule } from './app/persons.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PersonsModule,
    {
      transport: Transport.RMQ,
      options: {
        //shoto
      }
    }
  );
  await app.listen();
  Logger.log(
    `🚀 Application persons is running`
  );
}

bootstrap();
