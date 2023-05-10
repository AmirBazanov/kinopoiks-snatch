import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import * as process from 'process';

export function rmqConfig(): RabbitMQConfig {
  return {
    uri: process.env.RABBITMQ_URI,
    exchanges: [
      {
        name: 'AuthExchange',
        type: 'topic',
      },
    ],
    connectionInitOptions: { wait: false },
  };
}
