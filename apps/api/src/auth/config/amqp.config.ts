import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

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
