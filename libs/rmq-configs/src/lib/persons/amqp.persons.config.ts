import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqPersonConfig(): RabbitMQConfig {
  return {
    uri: process.env.RABBITMQ_URI,
    exchanges: [
      {
        name: 'PersonsExchange',
        type: 'topic',
      },
    ],
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}