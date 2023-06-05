import { RmqConfig } from '../types';

export const getGenreRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetGenresExchange',
    routingKey: 'get-genre',
    queue: 'GenreQueriesQueueId',
  };
};

export const getGenreByNameRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetGenresExchange',
    routingKey: 'get-genre-by-name',
    queue: 'GenreQueriesQueueName',
  };
};

export const getAllGenresRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetGenresExchange',
    routingKey: 'get-all-genres',
    queue: 'GenreQueriesQueueAll',
  };
};

export const getGenresArrayOfPersonRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetGenresExchange',
    routingKey: 'get-genres-of-person',
    queue: 'GenreQueriesQueue'
  }
}
