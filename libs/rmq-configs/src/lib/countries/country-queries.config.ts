import { RmqConfig } from '../types';

export const getCountryRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetCountriesExchange',
    routingKey: 'get-country',
    queue: 'CountryQueriesQueueId',
  };
};

export const getCountryByNameRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetCountriesExchange',
    routingKey: 'get-country-by-name',
    queue: 'CountryQueriesQueueName',
  };
};

export const getAllCountriesRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetCountriesExchange',
    routingKey: 'get-all-countries',
    queue: 'CountryQueriesQueueAll',
  }
};
