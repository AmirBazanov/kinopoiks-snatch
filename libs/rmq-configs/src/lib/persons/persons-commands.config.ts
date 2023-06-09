import { RmqConfig } from '../types';

export const createPerson = (): RmqConfig => {
  return {
    exchange: 'PersonsExchange',
    routingKey: 'create-person',
    queue: 'CreatePersonQueue',
  };
};
