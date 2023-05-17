import { RmqConfig } from '../types';

export function createCommentRMQConfig(): RmqConfig {
  return {
    exchange: 'PostCommentsExchange',
    routingKey: 'create-comment',
    queue: 'CommentCommandsQueue',
  };
}

export function incLikeCommentRMQConfig(): RmqConfig {
  return {
    exchange: 'PostCommentsExchange',
    routingKey: 'inc-like-comment',
    queue: 'incLikeCommentCommandsQueue',
  };
}

export function incDisCommentRMQConfig(): RmqConfig {
  return {
    exchange: 'PostCommentsExchange',
    routingKey: 'inc-dis-comment',
    queue: 'incDisCommentCommandsQueue',
  };
}
