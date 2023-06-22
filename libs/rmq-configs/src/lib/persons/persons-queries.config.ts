import { RmqConfig } from '../types';

export const getPersonByIdRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetPersonsExchange',
    routingKey: 'get-person-by-id',
    queue: 'PersonsQueueId',
  };
};

export const getPersonByNameRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetPersonsExchange',
    routingKey: 'get-person-by-name',
    queue: 'PersonsQueueName',
  }
}

export const getArrayPersonsOfMovieRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetPersonsExchange',
    routingKey: 'get-persons-by-movie',
    queue: 'PersonsQueueOfMovie',
  }
}
