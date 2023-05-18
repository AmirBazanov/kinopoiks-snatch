import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqPersonConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'GetPersonsExchange',
        type: 'topic',
      },
    ],
    uri: 'amqp://nestjs:nestjs@localhost:5672',
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}