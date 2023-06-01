import { RmqConfig } from '../types';

export const createCountryRMQConfig = (): RmqConfig => {
  return {
    exchange: 'PostCountriesExchange',
    routingKey: 'create-country',
    queue: 'CountryCommandsQueue',
  };
};
