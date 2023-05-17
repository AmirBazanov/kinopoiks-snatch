import { RmqConfig } from '../types';

export function getByIdCommentRMQConfig(): RmqConfig {
  return {
    exchange: 'GetCommentsExchange',
    routingKey: 'get-by-id-comment',
    queue: 'GetByIdCommentQueryQueue',
  };
}

export function getByFilmIdCommentsRMQConfig(): RmqConfig {
  return {
    exchange: 'GetCommentsExchange',
    routingKey: 'get-by-film-id-comments',
    queue: 'GetByFilmIdCommentsQueryQueue',
  };
}

export function getByUserIdCommentsRMQConfig(): RmqConfig {
  return {
    exchange: 'GetCommentsExchange',
    routingKey: 'get-by-user-id-comments',
    queue: 'GetByUserIdCommentsQueryQueue',
  };
}
