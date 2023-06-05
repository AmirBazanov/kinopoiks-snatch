import { RmqConfig } from '../types';

export const getPersonByIdRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PersonsExchange',
    routingKey: 'get-person-by-id',
    queue: 'PersonsQueue',
  };
};

export const getPersonByNameRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PersonsExchange',
    routingKey: 'get-person-by-name',
    queue: 'PersonsQueue',
  }
}