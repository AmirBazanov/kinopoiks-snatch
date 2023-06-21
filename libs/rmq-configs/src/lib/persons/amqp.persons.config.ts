import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqPersonConfig(): RabbitMQConfig {
  return {
    uri: process.env.RABBITMQ_URI,
    exchanges: [
      {
        name: 'PostPersonsExchange',
        type: 'topic',
      },
      {
        name: 'GetPersonsExchange',
        type: 'topic',
      },
      {
        name: 'PutPersonsExchange',
        type: 'topic',
      },
      {
        name: 'DeletePersonsExchange',
        type: 'topic',
      },
    ],
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
