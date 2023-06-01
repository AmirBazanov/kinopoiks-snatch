import { RmqConfig } from '../types';

export const createGenreRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostGenresExchange',
    routingKey: 'create-genre',
    queue: 'GenreCommandsQueue',
  };
};
