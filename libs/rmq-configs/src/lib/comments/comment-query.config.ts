import { RmqConfig } from '../types';

export function getByIdCommentRMQConfig(): RmqConfig {
  return {
    exchange: 'GetCommentsExchange',
    routingKey: 'get-by-id-comment',
    queue: 'GetByIdCommentQueryQueue',
  };
}
