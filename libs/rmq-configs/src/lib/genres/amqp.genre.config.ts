import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqGenreConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostGenresExchange',
        type: 'topic',
      },
      {
        name: 'GetGenresExchange',
        type: 'topic',
      },
      {
        name: 'PutGenresExchange',
        type: 'topic',
      },
      {
        name: 'DeleteGenresExchange',
        type: 'topic',
      },
    ],
    uri: process.env.RABBITMQ_URI,
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
