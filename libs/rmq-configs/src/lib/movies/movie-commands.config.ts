import { RmqConfig } from '../types';

export const createMovieRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostMoviesExchange',
    routingKey: 'create-movie',
    queue: 'MovieCommandsQueueCreate',
  };
};
