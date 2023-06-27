import { RmqConfig } from '../types';

export const updateCountryRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PutCountriesExchange',
    routingKey: 'update-country',
    queue: 'CountryEventsQueueUpdate',
  };
};
export const deleteCountryRMQConfig = (): RmqConfig => {
  return {
    exchange: 'DeleteCountriesExchange',
    routingKey: 'delete-country',
    queue: 'CountryEventsQueueDelete',
  };
};
