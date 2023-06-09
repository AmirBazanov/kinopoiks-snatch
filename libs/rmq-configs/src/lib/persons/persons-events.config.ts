import { RmqConfig } from '../types';

export const updatePersonRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PutPersonsExchange',
    routingKey: 'update-person',
    queue: 'PersonEventsQueueUpdate',
  };
};
export const deletePersonRMQConfig = (): RmqConfig => {
  return {
    exchange: 'DeletePersonsExchange',
    routingKey: 'delete-person',
    queue: 'PersonEventsQueueDelete',
  };
};

export const removeRoleRMQConfig = (): RmqConfig => {
  return {
    exchange: 'DeletePersonsExchange',
    routingKey: 'remove-role',
    queue: 'RoleEventsQueueRemove',
  };
};
