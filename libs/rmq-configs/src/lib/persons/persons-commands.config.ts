import { RmqConfig } from '../types';

export const createPersonRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostPersonsExchange',
    routingKey: 'create-person',
    queue: 'CreatePersonQueue',
  };
};
