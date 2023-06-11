import { RmqConfig } from '../types';

export function createUserRMQConfig(): RmqConfig {
  return {
    exchange: 'PostUsersExchange',
    routingKey: 'create-user',
    queue: 'CreateUserCommandsQueue',
  };
}

export function editUserRMQConfig(): RmqConfig {
  return {
    exchange: 'PutUsersExchange',
    routingKey: 'edit-user',
    queue: 'EditUserCommandQueue',
  };
}

export function editTokenRMQConfig(): RmqConfig {
  return {
    exchange: 'PutUsersExchange',
    routingKey: 'edit-token',
    queue: 'EditTokenCommandQueue',
  };
}

export function deleteUserRMQConfig(): RmqConfig {
  return {
    exchange: 'DeleteUsersExchange',
    routingKey: 'delete-user',
    queue: 'DeleteUserCommandQueue',
  };
}
