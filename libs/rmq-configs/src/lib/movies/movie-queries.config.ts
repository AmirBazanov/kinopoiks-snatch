import { RmqConfig } from '../types';

export const getMovieRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetMoviesExchange',
    routingKey: 'get-movie',
    queue: 'MovieQueriesQueueId',
  };
};

export const getMovieByTitleRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetMoviesExchange',
    routingKey: 'get-movie-by-title',
    queue: 'MovieQueriesQueueTitle',
  };
};
