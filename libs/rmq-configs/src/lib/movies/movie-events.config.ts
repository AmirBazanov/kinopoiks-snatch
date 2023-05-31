import { RmqConfig } from '../types';

export const updateMovieRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PutMoviesExchange',
    routingKey: 'update-movie',
    queue: 'MovieEventsQueue',
  };
};
