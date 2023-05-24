import { RmqConfig } from '../types';

export const getCountryRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetCountriesExchange',
    routingKey: 'get-country',
    queue: 'CountryQueriesQueueId',
  };
};

export const getCountryByTitleRMQConfig = (): RmqConfig => {
  return {
    exchange: 'GetCountriesExchange',
    routingKey: 'get-country-by-title',
    queue: 'CountryQueriesQueueTitle',
  };
};
