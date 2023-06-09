import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function authRmqConfig(): RabbitMQConfig {
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
