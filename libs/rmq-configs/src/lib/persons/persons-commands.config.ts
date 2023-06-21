import { RmqConfig } from '../types';

export const createPersonRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostPersonsExchange',
    routingKey: 'create-person',
    queue: 'CreatePersonQueue',
  };
};

export const addRoleRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostPersonsExchange',
    routingKey: 'add-role',
    queue: 'AddRoleQueue',
  };
};
