import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqCountryConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostCountriesExchange',
        type: 'topic',
      },
      {
        name: 'GetCountriesExchange',
        type: 'topic',
      },
    ],
    uri: 'amqp://nestjs:nestjs@localhost:5672',
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
