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
    ],
    uri: 'amqp://nestjs:nestjs@localhost:5672',
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
