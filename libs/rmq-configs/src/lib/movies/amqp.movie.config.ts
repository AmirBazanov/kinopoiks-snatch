import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqMovieConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostMoviesExchange',
        type: 'topic',
      },
      {
        name: 'GetMoviesExchange',
        type: 'topic',
      },
      {
        name: 'PutMoviesExchange',
        type: 'topic',
      },
      {
        name: 'DeleteMoviesExchange',
        type: 'topic',
      }
    ],
    uri: process.env.RABBITMQ_URI,
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
