import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import * as process from "process";

export function rmqCountryConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostCountriesExchange',
        type: 'topic',
      },
      {
        name: 'GetCountriesExchange',
        type: 'topic',
      },
      {
        name: 'PutCountriesExchange',
        type: 'topic',
      },
      {
        name: 'DeleteCountriesExchange',
        type: 'topic',
      },
    ],
    uri: process.env.RABBITMQ_URI,
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}
