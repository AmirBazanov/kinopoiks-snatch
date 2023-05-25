import { RmqConfig } from '../types';

export const createUserRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostUsersExchange',
    routingKey: 'create-user',
    queue: 'CreateUserCommandsQueue',
  };
};

export const deleteUserRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostUsersExchange',
    routingKey: 'delete-user',
    queue: 'DeleteUserCommandQueue',
  };
};
