import { RmqConfig } from '../types';

export const getPersonByIdRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PersonsExchange',
    routingKey: 'get-person-by-id',
    queue: 'PersonQueue',
  };
};