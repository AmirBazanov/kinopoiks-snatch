import { RmqConfig } from '../types';

export const createPersonRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PersonsExchange',
    routingKey: 'create-person',
    queue: 'CreatePersonQueue',
  };
};
