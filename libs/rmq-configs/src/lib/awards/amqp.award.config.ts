import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqAwardConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostAwardsExchange',
        type: 'topic',
      },
      {
        name: 'GetAwardsExchange',
        type: 'topic',
      },
    ],
    uri: process.env.RABBITMQ_URI,
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
