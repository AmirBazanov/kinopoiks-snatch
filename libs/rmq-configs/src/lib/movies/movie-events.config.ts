import { RmqConfig } from '../types';

export const updateMovieRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PutMoviesExchange',
    routingKey: 'update-movie',
    queue: 'MovieEventsQueueUpdate',
  };
};
export const deleteMovieRMQConfig = (): RmqConfig => {
  return {
    exchange: 'DeleteMoviesExchange',
    routingKey: 'delete-movie',
    queue: 'MovieEventsQueueDelete',
  };
};
