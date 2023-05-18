import { RmqConfig } from '../types';

export function createCommentRMQConfig(): RmqConfig {
  return {
    exchange: 'PostCommentsExchange',
    routingKey: 'create-comment',
    queue: 'CommentCommandsQueue',
  };
}
