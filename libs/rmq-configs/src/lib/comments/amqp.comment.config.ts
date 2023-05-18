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
    uri: 'amqp://nestjs:nestjs@localhost:5672',
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
