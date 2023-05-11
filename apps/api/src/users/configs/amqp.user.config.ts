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
    ],
    uri: 'amqp://nestjs:nestjs@localhost:5672',
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
