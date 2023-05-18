import { RmqConfig } from '../types';

export const getPersonByIdRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetPersonsExchange',
    routingKey: 'get-person-by-id',
    queue: 'PersonQueriesQueueId',
  };
};
