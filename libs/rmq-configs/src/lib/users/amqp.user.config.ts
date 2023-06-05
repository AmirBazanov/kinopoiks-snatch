import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqUserConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostUsersExchange',
        type: 'topic',
      },
      {
        name: 'GetUsersExchange',
        type: 'topic',
      },
      {
        name: 'PutUsersExchange',
        type: 'topic',
      },
      {
        name: 'DeleteUsersExchange',
        type: 'topic',
      },
    ],
    uri: process.env.RABBITMQ_URI,
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
