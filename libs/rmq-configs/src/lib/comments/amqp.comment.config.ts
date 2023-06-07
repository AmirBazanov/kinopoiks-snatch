import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqCommentConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostCommentsExchange',
        type: 'topic',
      },
      {
        name: 'GetCommentsExchange',
        type: 'topic',
      },
    ],
    uri: process.env.RABBITMQ_URI,
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
