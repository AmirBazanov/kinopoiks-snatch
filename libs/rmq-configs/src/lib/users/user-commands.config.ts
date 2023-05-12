import { RmqConfig } from '../types';

export const createUserRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostUsersExchange',
    routingKey: 'create-user',
    queue: 'UserCommandsQueue',
  };
};
