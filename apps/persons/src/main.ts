import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PersonsModule } from './app/persons.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PersonsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${configService.get('RABBITMQ_HOST')}`],
        queue: 'persons-queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  Logger.log(
    `🚀 Application persons is running`
  );
}

bootstrap();
