import { RmqConfig } from '../types';

export const getUserRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetUsersExchange',
    routingKey: 'get-user',
    queue: 'UserQueriesQueue',
  };
};

export const getUserByEmailRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetUsersExchange',
    routingKey: 'get-user-by-email',
    queue: 'UserQueriesQueue',
  };
};
