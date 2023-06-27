import { RmqConfig } from '../types';

export const updateGenreRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PutGenresExchange',
    routingKey: 'update-genre',
    queue: 'GenreEventsQueueUpdate',
  };
};
export const deleteGenreRMQConfig = (): RmqConfig => {
  return {
    exchange: 'DeleteGenresExchange',
    routingKey: 'delete-genre',
    queue: 'GenreEventsQueueDelete',
  };
};
